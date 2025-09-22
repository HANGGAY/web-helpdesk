import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// 📌 Register User (tetap email + nrk)
export const register = async (req, res) => {
  try {
    const { nrk, email, password, full_name, phone_number, location, role_id } =
      req.body;

    // Cek apakah NRK sudah ada
    const [existNrk] = await pool.query('SELECT * FROM users WHERE nrk = ?', [
      nrk,
    ]);
    if (existNrk.length > 0)
      return res.status(400).json({ error: 'NRK already registered ❌' });

    // Cek apakah email sudah ada
    const [existEmail] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (existEmail.length > 0)
      return res.status(400).json({ error: 'Email already registered ❌' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    await pool.query(
      `INSERT INTO users (nrk, email, hashedPassword, full_name, phone_number, location, role_id, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [nrk, email, hashedPassword, full_name, phone_number, location, role_id]
    );

    res.status(201).json({ message: 'User registered successfully 🚀' });
  } catch (err) {
    console.error('❌ Register error:', err);
    res.status(500).json({ error: err.message });
  }
};

/// 📌 LOGIN USER PAKAI NRK
export const login = async (req, res) => {
  try {
    const { nrk, password } = req.body;

    if (!nrk || !password) {
      return res.status(400).json({ error: 'NRK dan password wajib diisi ❌' });
    }

    // Ambil user berdasarkan NRK
    const [users] = await pool.query(
      `SELECT u.id, u.nrk, u.email, u.hashedPassword, u.full_name, r.role_name
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.nrk = ?`,
      [nrk]
    );

    if (users.length === 0) {
      return res.status(400).json({ error: 'NRK tidak ditemukan ❌' });
    }

    const user = users[0];

    // Cek password
    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
      return res.status(400).json({ error: 'Password salah ❌' });
    }

    // Buat token
    const token = jwt.sign(
      {
        id: user.id,
        nrk: user.nrk,
        email: user.email,
        role_name: user.role_name,
      },
      process.env.JWT_SECRET || 'mysecretkey',
      { expiresIn: '1d' }
    );

    res.json({
      message: '✅ Login berhasil',
      token,
      user: {
        id: user.id,
        nrk: user.nrk,
        email: user.email,
        full_name: user.full_name,
        role_name: user.role_name,
      },
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
};
