import { Router } from 'express';
import {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketTypes,
  getCategories,
  getSubCategories,
  getUrgencies,
  assignTicket,
  approveTicket,
  rejectTicket,
  updateTicketFeedback,
  updateTicketByTechnician,
} from '../controllers/ticket.controller.js';
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';

const router = Router();

// ✅ Tiket
router.get('/', verifyToken, getTickets);
router.post('/', verifyToken, createTicket);
router.put('/:id', verifyToken, updateTicket);
router.delete('/:id', verifyToken, deleteTicket);

// ✅ Master Data (taruh di atas `/:id` agar tidak bentrok)
router.get('/types/all', verifyToken, getTicketTypes);
router.get('/categories/all', verifyToken, getCategories);
router.get('/sub-categories/all', verifyToken, getSubCategories);
router.get('/urgencies/all', verifyToken, getUrgencies);

// ✅ Detail Ticket (taruh paling bawah biar tidak override route lain)
router.get('/:id', verifyToken, getTicketById);

// ✅Ticket proses admin
router.put('/:id/assign', verifyToken, checkRole(['Admin']), assignTicket);
router.put('/:id/approve', verifyToken, checkRole(['Admin']), approveTicket);
router.put('/:id/reject', verifyToken, checkRole(['Admin']), rejectTicket);
// ✅Ticket proses technician
router.put(
  '/:id/technician-update',
  verifyToken,
  checkRole(['Technician']),
  updateTicketByTechnician
);

router.put('/tickets/:id/feedback', verifyToken, updateTicketFeedback);

export default router;
