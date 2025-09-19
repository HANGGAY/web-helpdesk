import pool from '../config/db.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

// 📌 General user
export const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

export const createUser = async (data) => {
  const {
    role_id,
    username,
    email,
    password,
    full_name,
    phone_number,
    location,
  } = data;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const [result] = await pool.query(
    `INSERT INTO users (role_id, username, email, password, full_name, phone_number, location, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      role_id,
      username,
      email,
      hashedPassword,
      full_name,
      phone_number,
      location,
    ]
  );

  return result.insertId;
};

export const updateUser = async (id, data) => {
  const {
    role_id,
    username,
    email,
    password,
    full_name,
    phone_number,
    location,
  } = data;

  // Kalau password diisi → hash ulang
  let query = `
    UPDATE users
    SET role_id = ?, username = ?, email = ?, full_name = ?, phone_number = ?, location = ?, updated_at = NOW()
    WHERE id = ?
  `;
  let params = [
    role_id,
    username,
    email,
    full_name,
    phone_number,
    location,
    id,
  ];

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    query = `
      UPDATE users
      SET role_id = ?, username = ?, email = ?, password = ?, full_name = ?, phone_number = ?, location = ?, updated_at = NOW()
      WHERE id = ?
    `;
    params = [
      role_id,
      username,
      email,
      hashedPassword,
      full_name,
      phone_number,
      location,
      id,
    ];
  }

  const [result] = await pool.query(query, params);
  return result.affectedRows;
};

export const deleteUser = async (id) => {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return result;
};
// 📌 Auth helper
const UserModel = {
  async registerUser({ username, email, password }) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    return result.insertId;
  },

  async getUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);
    return rows[0];
  },
};

export default UserModel;
src / models / ticket.model.js;
