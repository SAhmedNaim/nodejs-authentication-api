import express from 'express';
import { admin, protect } from '../middlewares/authMiddleware.js';
import { login, register, getUsers, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', protect, admin, getUsers);
router.put('/', protect, updateUserProfile);

export default router;
