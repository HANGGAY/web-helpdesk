import { useState } from 'react';
import api from '../services/axios';

function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role_id: '',
    full_name: '',
    phone_number: '',
    location: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      setSuccess(res.data.message || 'Registrasi berhasil');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Registrasi gagal');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <br />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <br />
        <input
          name="full_name"
          placeholder="Full Name"
          onChange={handleChange}
        />
        <br />
        <input
          name="phone_number"
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <br />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <br />
        <input name="role_id" placeholder="Role ID" onChange={handleChange} />
        <br />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default RegisterPage;
