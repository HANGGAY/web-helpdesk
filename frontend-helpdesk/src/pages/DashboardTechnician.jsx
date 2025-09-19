import { useEffect, useState } from 'react';
import api from '../services/axios';

const DashboardTechnician = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchAssignedTickets = async () => {
      try {
        const res = await api.get('/tickets/assigned');
        setTickets(res.data);
      } catch (err) {
        console.error('❌ Error fetching tickets:', err);
      }
    };
    fetchAssignedTickets();
  }, []);

  const handleUpdate = async (id, status, progress) => {
    try {
      await api.put(`/tickets/${id}/technician-update`, {
        current_status_id: status,
        progress_percentage: progress,
      });
      alert('✅ Tiket berhasil diperbarui');
    } catch (err) {
      alert(err.response?.data?.error || '❌ Gagal update tiket');
    }
  };

  return (
    <div>
      <h2>🛠️ Tiket yang Ditugaskan</h2>
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
            <strong>Status:</strong> {ticket.current_status_id}
          </p>
          <p>
            <strong>Progress:</strong> {ticket.progress_percentage}%
          </p>
          <p>
            <strong>Approval:</strong> {ticket.approval_status}
          </p>

          {['Approved', 'Rejected'].includes(ticket.approval_status) ? (
            <div>
              <label>
                Status ID:{' '}
                <input
                  type="number"
                  onChange={(e) => (ticket.newStatus = e.target.value)}
                />
              </label>
              <label>
                Progress %:{' '}
                <input
                  type="number"
                  onChange={(e) => (ticket.newProgress = e.target.value)}
                />
              </label>
              <button
                onClick={() =>
                  handleUpdate(ticket.id, ticket.newStatus, ticket.newProgress)
                }
              >
                Update
              </button>
            </div>
          ) : (
            <p style={{ color: 'red' }}>❌ Tiket belum di-approve/reject</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardTechnician;
