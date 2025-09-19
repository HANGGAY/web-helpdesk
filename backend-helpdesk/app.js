import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import authRoutes from './src/routes/auth.route.js';
import userRoutes from './src/routes/user.route.js';
import ticketRoutes from './src/routes/ticket.route.js';

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(morgan('dev'));

// ✅ CORS setup
const whitelistCors = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4000',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelistCors.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};
app.use(cors(corsOptions));

  // ✅ Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/tickets', ticketRoutes);

// ✅ Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Helpdesk API is running 🚀' });
});

// ✅ Error handling
app.use((err, req, res, next) => {
  console.error('🔥 Global error:', err.message);
  res.status(500).json({ error: err.message });
});

export default app;
