import { useEffect, useState } from 'react';
import api from '../services/axios';

const DashboardUser = () => {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    category_id: '',
    sub_category_id: '',
    subject: '',
    description: '',
  });

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const res = await api.get('/tickets/my');
        setTickets(res.data);
      } catch (err) {
        console.error('❌ Error fetching tickets:', err);
      }
    };
    fetchMyTickets();
  }, []);

  const handleCreateTicket = async () => {
    try {
      await api.post('/tickets', form);
      alert('✅ Tiket berhasil dibuat');
    } catch (err) {
      alert(err.response?.data?.error || '❌ Gagal membuat tiket');
    }
  };

  const handleFeedback = async (id, feedback) => {
    try {
      await api.put(`/tickets/${id}/feedback`, { feedback });
      alert('✅ Feedback berhasil dikirim');
    } catch (err) {
      alert(err.response?.data?.error || '❌ Gagal kirim feedback');
    }
  };

  return (
    <div>
      <h2>🎫 Tiket Saya</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id} style={{ marginBottom: '1rem' }}>
            <strong>{ticket.subject}</strong> - {ticket.progress_percentage}%
            <br />
            {ticket.progress_percentage === 100 && !ticket.feedback ? (
              <div>
                <input
                  placeholder="Masukkan feedback..."
                  onChange={(e) => (ticket.feedbackText = e.target.value)}
                />
                <button
                  onClick={() => handleFeedback(ticket.id, ticket.feedbackText)}
                >
                  Kirim Feedback
                </button>
              </div>
            ) : (
              <p>Feedback: {ticket.feedback || 'Belum ada'}</p>
            )}
          </li>
        ))}
      </ul>

      <h3>📝 Buat Tiket Baru</h3>
      <input
        placeholder="Kategori ID"
        onChange={(e) => setForm({ ...form, category_id: e.target.value })}
      />
      <input
        placeholder="Subkategori ID"
        onChange={(e) => setForm({ ...form, sub_category_id: e.target.value })}
      />
      <input
        placeholder="Judul Masalah"
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      <textarea
        placeholder="Deskripsi"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button onClick={handleCreateTicket}>Kirim Tiket</button>
    </div>
  );
};

export default DashboardUser;
