import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Cek apakah user sudah ada
    const [exist] = await pool.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);
    if (exist.length > 0)
      return res.status(400).json({ error: 'Email already registered' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully 🚀' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ambil user + role_name
    const [users] = await pool.query(
      `
      SELECT u.*, r.role_name 
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.email = ?
    `,
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = users[0];

    // Cek password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Buat token dengan role_name
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role_name: user.role_name,
      },
      process.env.JWT_SECRET || 'mysecretkey',
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login success ✅', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
