import express from 'express';
import { getPrograms, createProgram, updateProgram, deleteProgram } from '../controllers/programController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getPrograms);
router.post('/', protect, upload.single('poster'), createProgram);
router.put('/:id', protect, upload.single('poster'), updateProgram);
router.delete('/:id', protect, deleteProgram);

export default router;
