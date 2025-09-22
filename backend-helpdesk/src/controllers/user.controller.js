import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

// Get all users
export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.id, u.nrk, u.email, u.full_name, u.phone_number, u.location, r.role_name
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
    `);
    res.json(rows);
  } catch (err) {
    console.error('❌ Error getUsers:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nrk, email, full_name, phone_number, location FROM users WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single user by NRK
export const getUserByNrk = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nrk, email, full_name, phone_number, location FROM users WHERE nrk = ?',
      [req.params.nrk]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new user
export const createUser = async (req, res) => {
  try {
    const { role_id, nrk, email, password, full_name, phone_number, location } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users (role_id, nrk, email, password, full_name, phone_number, location, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [role_id, nrk, email, hashedPassword, full_name, phone_number, location]
    );

    res
      .status(201)
      .json({ id: result.insertId, message: 'User created successfully ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { nrk, email, password, full_name, phone_number, location, role_id } =
      req.body;
    let hashedPassword = null;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await pool.query(
      `UPDATE users 
       SET nrk = ?, email = ?, password = COALESCE(?, password), full_name = ?, phone_number = ?, location = ?, role_id = ?, updated_at = NOW() 
       WHERE id = ?`,
      [
        nrk,
        email,
        hashedPassword,
        full_name,
        phone_number,
        location,
        role_id,
        req.params.id,
      ]
    );

    res.json({ message: 'User updated successfully ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'User deleted successfully 🗑️' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
