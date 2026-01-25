import express from 'express';
import { getGrants, createGrant, updateGrant, deleteGrant } from '../controllers/grantController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getGrants);
router.post('/', protect, upload.single('poster'), createGrant);
router.put('/:id', protect, upload.single('poster'), updateGrant);
router.delete('/:id', protect, deleteGrant);

export default router;
