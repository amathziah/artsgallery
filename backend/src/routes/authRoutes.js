import express from 'express';
import { login, register, profile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js'; // ✅ IMPORTANT

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

// Admin profile (JWT protected)
router.get('/profile', protect, profile);

export default router;
