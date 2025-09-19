import axios from 'axios';

const API_URL = import.meta.env.VITE_TR_API_POS;

export const login = async (nrk, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { nrk, password });

  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data.user));

  return response.data;
};

export const registerUser = async (
  nrk,
  nama_karyawan,
  password,
  role,
  jabatan,
  nama_pt,
  cabang,
  departemen
) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    nrk,
    nama_karyawan,
    password,
    role,
    jabatan,
    nama_pt,
    cabang,
    departemen, // lokasi dan username dihapus sesuai perubahan backend
  });

  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
