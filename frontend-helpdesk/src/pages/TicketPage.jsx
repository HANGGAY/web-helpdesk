import { useEffect, useState } from 'react';
import api from '../services/axios';

export default function TicketPage() {
  const [tickets, setTickets] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [urgencies, setUrgencies] = useState([]);

  const [form, setForm] = useState({
    ticket_type_id: '',
    category_id: '',
    sub_category_id: '',
    urgency_id: '',
    subject: '',
    description: '',
  });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  // ✅ Ambil semua tiket
  const fetchTickets = async () => {
    try {
      const res = await api.get('/tickets', { headers });
      setTickets(res.data);
    } catch (err) {
      console.error('❌ Error fetch tickets:', err);
    }
  };

  // ✅ Ambil master data untuk dropdown
  const fetchDropdownData = async () => {
    try {
      const [tt, cat, subCat, urg] = await Promise.all([
        api.get('/tickets/types/all', { headers }),
        api.get('/tickets/categories/all', { headers }),
        api.get('/tickets/sub-categories/all', { headers }),
        api.get('/tickets/urgencies/all', { headers }),
      ]);

      setTicketTypes(tt.data);
      setCategories(cat.data);
      setSubCategories(subCat.data);
      setUrgencies(urg.data);
    } catch (err) {
      console.error('❌ Error fetching dropdown data:', err);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchDropdownData();
  }, []);

  // ✅ Submit ticket baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tickets', form, { headers });
      alert('✅ Ticket berhasil dibuat!');
      setForm({
        ticket_type_id: '',
        category_id: '',
        sub_category_id: '',
        urgency_id: '',
        subject: '',
        description: '',
      });
      fetchTickets();
    } catch (err) {
      console.error('❌ Error create ticket:', err.response?.data || err);
      alert('Gagal membuat ticket!');
    }
  };

  // ✅ Hapus ticket
  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin hapus ticket ini?')) return;
    try {
      await api.delete(`/tickets/${id}`, { headers });
      fetchTickets();
    } catch (err) {
      console.error('❌ Error delete ticket:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">🎫 Ticket Management</h2>

      {/* ===== FORM CREATE TICKET ===== */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        {/* Ticket Type */}
        <div>
          <label className="block mb-1 font-medium">Ticket Type</label>
          <select
            value={form.ticket_type_id}
            onChange={(e) =>
              setForm({ ...form, ticket_type_id: e.target.value })
            }
            className="w-full border rounded p-2"
          >
            <option value="">-- Pilih Ticket Type --</option>
            {ticketTypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.type_name || t.name || ''}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            className="w-full border rounded p-2"
          >
            <option value="">-- Pilih Category --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.category_name || c.name || ''}
              </option>
            ))}
          </select>
        </div>

        {/* Sub Category */}
        <div>
          <label className="block mb-1 font-medium">Sub Category</label>
          <select
            value={form.sub_category_id}
            onChange={(e) =>
              setForm({ ...form, sub_category_id: e.target.value })
            }
            className="w-full border rounded p-2"
          >
            <option value="">-- Pilih Sub Category --</option>
            {subCategories.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.sub_category_name || sc.name || ''}
              </option>
            ))}
          </select>
        </div>

        {/* Urgency */}
        <div>
          <label className="block mb-1 font-medium">Urgency</label>
          <select
            value={form.urgency_id}
            onChange={(e) => setForm({ ...form, urgency_id: e.target.value })}
            className="w-full border rounded p-2"
          >
            <option value="">-- Pilih Urgency --</option>
            {urgencies.map((u) => (
              <option key={u.id} value={u.id}>
                {u.urgency_level || u.name || ''}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block mb-1 font-medium">Subject</label>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full border rounded p-2"
            placeholder="Masukkan subject"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded p-2"
            placeholder="Jelaskan masalah..."
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Ticket
        </button>
      </form>

      {/* ===== LIST TICKET ===== */}
      <h3 className="text-xl font-bold mb-3">📋 Daftar Tiket</h3>
      {tickets.length === 0 ? (
        <p className="text-gray-500">Belum ada tiket.</p>
      ) : (
        <ul className="space-y-3">
          {tickets.map((t) => (
            <li
              key={t.id}
              className="border rounded p-3 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{t.subject}</p>
                <p className="text-sm text-gray-600">{t.description}</p>
                <p className="text-xs text-gray-500">
                  By: {t.username || '-'} | Type: {t.ticket_type_name || '-'} |{' '}
                  Category: {t.category_name || '-'} | Urgency:{' '}
                  {t.urgency_name || '-'}
                </p>
              </div>
              <button
                onClick={() => handleDelete(t.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
