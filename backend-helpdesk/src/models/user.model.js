import pool from '../config/db.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

// 📌 General user
export const getAllUsers = async () => {
  const [rows] = await pool.query(`
    SELECT u.*, r.role_name 
    FROM users u
    LEFT JOIN roles r ON u.role_id = r.id
  `);
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await pool.query(
    'SELECT u.*, r.role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.id = ?',
    [id]
  );
  return rows[0];
};

export const getUserByNrk = async (nrk) => {
  const [rows] = await pool.query(
    'SELECT u.*, r.role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.nrk = ?',
    [nrk]
  );
  return rows[0];
};

export const createUser = async (data) => {
  const { role_id, nrk, email, password, full_name, phone_number, location } =
    data;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const [result] = await pool.query(
    `INSERT INTO users (role_id, nrk, email, password, full_name, phone_number, location, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
    [role_id, nrk, email, hashedPassword, full_name, phone_number, location]
  );

  return result.insertId;
};

export const updateUser = async (id, data) => {
  const { role_id, nrk, email, password, full_name, phone_number, location } =
    data;

  let query = `
    UPDATE users
    SET role_id = ?, nrk = ?, email = ?, full_name = ?, phone_number = ?, location = ?, updated_at = NOW()
    WHERE id = ?
  `;
  let params = [role_id, nrk, email, full_name, phone_number, location, id];

  if (password) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    query = `
      UPDATE users
      SET role_id = ?, nrk = ?, email = ?, password = ?, full_name = ?, phone_number = ?, location = ?, updated_at = NOW()
      WHERE id = ?
    `;
    params = [
      role_id,
      nrk,
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
  async registerUser({ nrk, email, password }) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const [result] = await pool.query(
      'INSERT INTO users (nrk, email, password) VALUES (?, ?, ?)',
      [nrk, email, hashedPassword]
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
