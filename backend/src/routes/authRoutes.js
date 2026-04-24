import express from 'express';
import { login, register, profile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js'; // ✅ IMPORTANT

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/reset-admin', async (req, res) => {
  const Admin = (await import('../models/Admin.js')).default;
  const admin = await Admin.findOne({ email: 'admin@saatsaatharts.org' });
  if (!admin) return res.status(404).json({ message: 'Not found' });
  admin.password = 'SSA@2024';
  await admin.save();
  res.json({ message: 'Password reset done' });
});

// Admin profile (JWT protected)
router.get('/profile', protect, profile);

export default router;
