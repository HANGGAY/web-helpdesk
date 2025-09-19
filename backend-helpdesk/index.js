import app from './app.js';
import pool from './src/config/db.js';

const PORT = process.env.PORT || 3000;
const BASEURL = process.env.APP_URL || `http://localhost:${PORT}`;

async function startServer() {
  try {
    // 🔥 Test koneksi DB
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('✅ Database connected, test result:', rows[0].result);

    // ✅ Jalankan server hanya kalau DB ready
    app.listen(PORT, () => {
      console.log(`🚀 Server running on ${BASEURL}`);
    });
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1); // Stop server kalau DB gagal
  }
}

startServer();
