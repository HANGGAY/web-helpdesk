import { Router } from 'express';
import {
  getUsers,
  getUserById,
  getUserByNrk,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, getUsers);
router.get('/:id', verifyToken, getUserById);
router.get('/nrk/:nrk', verifyToken, getUserByNrk);
router.post('/', verifyToken, createUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;
