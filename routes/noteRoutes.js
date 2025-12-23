import express from 'express';
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} from '../controllers/noteController.js';

const router = express.Router();

// GET /api/notes - Get all notes
router.get('/', getNotes);

// GET /api/notes/:id - Get single note by ID
router.get('/:id', getNote);

// POST /api/notes - Create a new note
router.post('/', createNote);

// PUT /api/notes/:id - Update a note by ID
router.put('/:id', updateNote);

// DELETE /api/notes/:id - Delete a note by ID
router.delete('/:id', deleteNote);

export default router;
