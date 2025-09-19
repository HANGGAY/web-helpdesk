import pool from '../config/db.js';
import Ticket from '../models/ticket.model.js';

// ✅ Get all tickets
export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get ticket by ID
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔧 Generate kode tiket unik
const generateTicketCode = () => {
  const date = new Date();
  const yyyyMMdd = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(100 + Math.random() * 900); // 3 digit acak
  return `TCK-${yyyyMMdd}-${random}`;
};

export const createTicket = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category_id, sub_category_id, subject, description } = req.body;

    // 🔍 Validasi: cari tiket selesai tanpa feedback
    const [rows] = await pool.query(
      `
      SELECT id FROM tickets
      WHERE user_id = ?
        AND progress_percentage = 100
        AND (feedback IS NULL OR feedback = '')
    `,
      [userId]
    );

    if (rows.length > 0) {
      return res.status(400).json({
        error:
          '❌ Anda belum mengisi feedback pada tiket yang sudah selesai. Silakan isi feedback terlebih dahulu sebelum membuat tiket baru.',
      });
    }

    const ticketCode = generateTicketCode();

    // ✅ Buat tiket baru
    await pool.query(
      `
      INSERT INTO tickets (
        ticket_code, user_id, category_id, sub_category_id, subject, description,
        current_status_id, approval_status, progress_percentage,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, 1, 'Pending', 0, NOW(), NOW())
    `,
      [ticketCode, userId, category_id, sub_category_id, subject, description]
    );

    res.json({
      message: '✅ Tiket berhasil dibuat',
      ticket_code: ticketCode,
    });
  } catch (err) {
    console.error('❌ Error createTicket:', err);
    res.status(500).json({ error: err.message });
  }
};
export const updateTicketFeedback = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { feedback } = req.body;
    const userId = req.user.id;

    // Pastikan tiket milik user
    const [rows] = await pool.query(
      `
      SELECT id FROM tickets WHERE id = ? AND user_id = ?
    `,
      [ticketId, userId]
    );

    if (rows.length === 0) {
      return res
        .status(403)
        .json({ error: '❌ Tiket tidak ditemukan atau bukan milik Anda' });
    }

    await pool.query(
      `
      UPDATE tickets SET feedback = ?, updated_at = NOW() WHERE id = ?
    `,
      [feedback, ticketId]
    );

    res.json({ message: '✅ Feedback berhasil disimpan' });
  } catch (err) {
    console.error('❌ Error updateTicketFeedback:', err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update ticket
export const updateTicket = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;
    const affectedRows = await Ticket.update(req.params.id, {
      title,
      description,
      category,
      status,
    });

    if (!affectedRows)
      return res.status(404).json({ error: 'Ticket not found' });
    res.json({ message: 'Ticket updated successfully ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete ticket
export const deleteTicket = async (req, res) => {
  try {
    const affectedRows = await Ticket.delete(req.params.id);
    if (!affectedRows)
      return res.status(404).json({ error: 'Ticket not found' });
    res.json({ message: 'Ticket deleted successfully 🗑️' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Master Data
export const getTicketTypes = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM ticket_types ORDER BY id ASC'
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSubCategories = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM sub_categories ORDER BY id ASC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUrgencies = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM urgencies ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const assignTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { assigned_to_user_id, ticket_type_id, urgency_id } = req.body;
    const assigned_by_user_id = req.user.id;

    const [rows] = await pool.query('SELECT * FROM tickets WHERE id = ?', [
      ticketId,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tiket tidak ditemukan' });
    }

    const ticket = rows[0];

    // ❗ Validasi: hanya tiket yang sudah di-approve atau di-reject yang bisa di-assign
    if (!['Approved', 'Rejected'].includes(ticket.approval_status)) {
      return res.status(400).json({
        error:
          '❌ Tiket belum di-approve atau ditolak. Silakan proses approval terlebih dahulu.',
      });
    }

    if (!assigned_to_user_id || !ticket_type_id || !urgency_id) {
      return res.status(400).json({
        error:
          'assigned_to_user_id, ticket_type_id, dan urgency_id wajib diisi',
      });
    }

    await pool.query(
      `
      UPDATE tickets 
      SET 
        assigned_to_user_id = ?, 
        assigned_by_user_id = ?, 
        ticket_type_id = ?, 
        urgency_id = ?, 
        current_status_id = 2,
        updated_at = NOW()
      WHERE id = ?
    `,
      [
        assigned_to_user_id,
        assigned_by_user_id,
        ticket_type_id,
        urgency_id,
        ticketId,
      ]
    );

    res.json({ message: '✅ Tiket berhasil di-assign ke teknisi' });
  } catch (err) {
    console.error('❌ Error assignTicket:', err);
    res.status(500).json({ error: err.message });
  }
};

export const approveTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;

    await pool.query(
      `
      UPDATE tickets 
      SET approval_status = 'Approved', updated_at = NOW()
      WHERE id = ?
    `,
      [ticketId]
    );

    res.json({ message: '✅ Tiket berhasil di-approve' });
  } catch (err) {
    console.error('❌ Error approveTicket:', err);
    res.status(500).json({ error: err.message });
  }
};

export const rejectTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;

    await pool.query(
      `
      UPDATE tickets 
      SET approval_status = 'Rejected', updated_at = NOW()
      WHERE id = ?
    `,
      [ticketId]
    );

    res.json({ message: '❌ Tiket berhasil ditolak' });
  } catch (err) {
    console.error('❌ Error rejectTicket:', err);
    res.status(500).json({ error: err.message });
  }
};

export const updateTicketByTechnician = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { current_status_id, progress_percentage } = req.body;
    const technicianId = req.user.id;

    // Ambil tiket dan validasi kepemilikan
    const [rows] = await pool.query(
      `
      SELECT * FROM tickets WHERE id = ? AND assigned_to_user_id = ?
    `,
      [ticketId, technicianId]
    );

    if (rows.length === 0) {
      return res
        .status(403)
        .json({ error: '❌ Anda tidak memiliki akses ke tiket ini' });
    }

    const ticket = rows[0];

    // ❗ Validasi approval status
    if (!['Approved', 'Rejected'].includes(ticket.approval_status)) {
      return res.status(400).json({
        error:
          '❌ Tiket belum di-approve atau ditolak. Tidak bisa mengubah status atau progress.',
      });
    }

    // Validasi input
    if (current_status_id === undefined && progress_percentage === undefined) {
      return res.status(400).json({
        error:
          '❗ Harus mengisi minimal salah satu: current_status_id atau progress_percentage',
      });
    }

    // Bangun query dinamis
    const fields = [];
    const values = [];

    if (current_status_id !== undefined) {
      fields.push('current_status_id = ?');
      values.push(current_status_id);
    }

    if (progress_percentage !== undefined) {
      fields.push('progress_percentage = ?');
      values.push(progress_percentage);
    }

    fields.push('updated_at = NOW()');
    const query = `UPDATE tickets SET ${fields.join(', ')} WHERE id = ?`;
    values.push(ticketId);

    await pool.query(query, values);

    res.json({ message: '✅ Tiket berhasil diperbarui oleh teknisi' });
  } catch (err) {
    console.error('❌ Error updateTicketByTechnician:', err);
    res.status(500).json({ error: err.message });
  }
};
