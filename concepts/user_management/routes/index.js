import express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { validateUser, validateUserUpdate } from '../middleware/validation.js';

const router = express.Router();

router.post('/users', validateUser, createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', validateUserUpdate, updateUser);
router.delete('/users/:id', deleteUser);

export default router;
