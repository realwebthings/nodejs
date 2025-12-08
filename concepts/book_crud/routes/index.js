import express from 'express';
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';

const router = express.Router();

// Create a new book
router.post('/books', createBook);

// Get all books
router.get('/books', getBooks);

// Get a book by ID
router.get('/books/:id', getBookById);

// Update a book by ID
router.put('/books/:id', updateBook);

// Delete a book by ID
router.delete('/books/:id', deleteBook);

export default router;