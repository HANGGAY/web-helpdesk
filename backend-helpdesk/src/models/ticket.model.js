// src/models/ticket.model.js
import pool from '../config/db.js';

class Ticket {
  static async findAll() {
    const [rows] = await pool.query(`
    SELECT 
      t.*, 
      c.category_name, 
      sc.sub_category_name, 
      u.urgency_level, 
      s.status_name
    FROM tickets t
    JOIN categories c ON t.category_id = c.id
    JOIN sub_categories sc ON t.sub_category_id = sc.id
    LEFT JOIN urgencies u ON t.urgency_id = u.id
    JOIN ticket_statuses s ON t.current_status_id = s.id
    ORDER BY t.created_at DESC
  `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `
    SELECT 
      t.*, 
      c.category_name, 
      sc.sub_category_name, 
      u.urgency_level, 
      s.status_name
    FROM tickets t
    JOIN categories c ON t.category_id = c.id
    JOIN sub_categories sc ON t.sub_category_id = sc.id
    LEFT JOIN urgencies u ON t.urgency_id = u.id
    JOIN ticket_statuses s ON t.current_status_id = s.id
    WHERE t.id = ?
  `,
      [id]
    );
    return rows[0];
  }

  static async create({
    ticket_code,
    user_id,
    category_id,
    sub_category_id,
    urgency_id = null,
    subject,
    description,
    current_status_id,
  }) {
    const [result] = await pool.query(
      `
    INSERT INTO tickets 
      (ticket_code, user_id, category_id, sub_category_id, urgency_id, subject, description, current_status_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
  `,
      [
        ticket_code,
        user_id,
        category_id,
        sub_category_id || null,
        urgency_id || null,
        subject,
        description,
        current_status_id,
      ]
    );

    return await this.findById(result.insertId);
  }

  static async update(
    id,
    {
      category_id,
      sub_category_id,
      urgency_id,
      subject,
      description,
      current_status_id,
    }
  ) {
    const [result] = await pool.query(
      `
      UPDATE tickets
      SET category_id=?, sub_category_id=?, urgency_id=?, subject=?, description=?, current_status_id=?, updated_at=NOW()
      WHERE id=?
    `,
      [
        category_id,
        sub_category_id,
        urgency_id,
        subject,
        description,
        current_status_id,
        id,
      ]
    );

    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM tickets WHERE id=?', [id]);
    return result.affectedRows;
  }
}

export default Ticket;
