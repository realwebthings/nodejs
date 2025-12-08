import express from 'express';
import { createNote, getNotes, updateNote, deleteNote } from '../controllers/noteController.js';

const router = express.Router();

router.post('/notes', createNote);
router.get('/notes', getNotes);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

export default router;
