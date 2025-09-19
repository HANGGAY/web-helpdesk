import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/login', {
      email,
      password,
    });

    const { token } = res.data;
    const decoded = jwt_decode(token);
    const role = decoded.role_name;

    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    if (role === 'User') navigate('/user');
    else if (role === 'Admin' || role === 'Lead') navigate('/admin');
    else if (role === 'Technician') navigate('/technician');
    else navigate('/login');
  } catch (err) {
    alert('❌ Login gagal. Periksa email dan password.');
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });
      console.log('Login response:', res.data);

      const { token, role } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'User') navigate('/user');
      else if (role === 'Admin' || role === 'Lead') navigate('/admin');
      else if (role === 'Technician') navigate('/technician');
      else navigate('/login');
    } catch (err) {
      console.error('Login error:', err);
      alert('❌ Login gagal. Periksa email dan password.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔐 Login Helpdesk</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
