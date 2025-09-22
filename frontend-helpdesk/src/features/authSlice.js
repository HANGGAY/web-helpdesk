import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  login,
  registerUser as apiRegister,
} from '../../services/api/auth/authApi';

// State awal
const initialState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  loading: false,
  error: null,
};

// AsyncThunk untuk login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ nrk, password }, { rejectWithValue }) => {
    try {
      const data = await login(nrk, password);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login gagal!');
    }
  }
);

// AsyncThunk untuk register
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      await apiRegister(
        userData.nrk,
        userData.nama_karyawan,
        userData.password,
        userData.role,
        userData.jabatan,
        userData.nama_pt,
        userData.cabang,
        userData.departemen // lokasi dihapus di backend
      );
      return 'Registrasi berhasil';
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Registrasi gagal!'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
