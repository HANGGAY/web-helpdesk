import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

// export const getUsers = async (req, res) => {
//   try {
//     const [rows] = await pool.query(`
//       SELECT
//         u.id,
//         u.username,
//         u.email,
//         u.password,
//         r.role_name
//       FROM users u
//       JOIN roles r ON u.role_id = r.id
//     `);
//     res.json(rows);
//   } catch (err) {
//     console.error('❌ Error getUsers:', err);
//     res.status(500).json({ error: err.message });
//   }
// };

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        u.id, 
        u.username, 
        u.email, 
        u.password, 
        r.role_name 
      FROM users u
      JOIN roles r ON u.role_id = r.id
    `);
    res.json(rows);
  } catch (err) {
    console.error('❌ Error getUsers:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get single user
export const getUserById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, email FROM users WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let hashedPassword = null;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await pool.query(
      'UPDATE users SET username = ?, email = ?, password = COALESCE(?, password) WHERE id = ?',
      [username, email, hashedPassword, req.params.id]
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
