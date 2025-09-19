import { useEffect, useState } from 'react';
import api from '../services/axios';

const DashboardAdmin = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchPendingTickets = async () => {
      try {
        const res = await api.get('/tickets/pending');
        setTickets(res.data);
      } catch (err) {
        console.error('❌ Error fetching tickets:', err);
      }
    };
    fetchPendingTickets();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      await api.put(`/tickets/${id}/${status}`); // status = 'approve' or 'reject'
      alert(`✅ Tiket ${status} berhasil`);
    } catch (err) {
      alert(err.response?.data?.error || '❌ Gagal update approval');
    }
  };

  const handleAssign = async (
    id,
    assign_user_id,
    ticket_type_id,
    urgency_id
  ) => {
    try {
      await api.put(`/tickets/${id}/assign`, {
        assigned_to_user_id: assign_user_id,
        ticket_type_id,
        urgency_id,
      });
      alert('✅ Tiket berhasil di-assign');
    } catch (err) {
      alert(err.response?.data?.error || '❌ Gagal assign tiket');
    }
  };

  return (
    <div>
      <h2>📋 Tiket Menunggu Persetujuan</h2>
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            marginBottom: '1rem',
          }}
        >
          <p>
            <strong>Subject:</strong> {ticket.subject}
          </p>
          <p>
            <strong>Status:</strong> {ticket.approval_status}
          </p>

          <button onClick={() => handleApproval(ticket.id, 'approve')}>
            ✅ Approve
          </button>
          <button onClick={() => handleApproval(ticket.id, 'reject')}>
            ❌ Reject
          </button>

          <div style={{ marginTop: '1rem' }}>
            <label>
              Teknisi ID:{' '}
              <input
                type="number"
                onChange={(e) => (ticket.assign_user_id = e.target.value)}
              />
            </label>
            <label>
              Type ID:{' '}
              <input
                type="number"
                onChange={(e) => (ticket.ticket_type_id = e.target.value)}
              />
            </label>
            <label>
              Urgency ID:{' '}
              <input
                type="number"
                onChange={(e) => (ticket.urgency_id = e.target.value)}
              />
            </label>
            <button
              onClick={() =>
                handleAssign(
                  ticket.id,
                  ticket.assign_user_id,
                  ticket.ticket_type_id,
                  ticket.urgency_id
                )
              }
            >
              🧑‍🔧 Assign
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardAdmin;
