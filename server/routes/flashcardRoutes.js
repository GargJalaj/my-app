const express = require('express');
const {
    uploadAndGenerateFlashcards,
    getUserFlashcardSets,
    getFlashcardSetById,
    deleteFlashcardSet,
} = require('../controllers/flashcardController');
const { protect } = require('../middleware/authMiddleware'); // Middleware to protect routes
const uploadMiddleware = require('../middleware/uploadMiddleware'); // Multer middleware

const router = express.Router();

// Apply protect middleware to all routes in this file
router.use(protect);

// Define routes - all are now private

// POST /api/flashcards/upload - Upload PDF and generate flashcards
router.post(
    '/upload',
    uploadMiddleware('pdfFile'), // Apply multer middleware configured for 'pdfFile' field
    uploadAndGenerateFlashcards
);

// GET /api/flashcards - Get all sets for the logged-in user
router.get('/', getUserFlashcardSets);

// GET /api/flashcards/:id - Get a specific set by ID
router.get('/:id', getFlashcardSetById);

// DELETE /api/flashcards/:id - Delete a specific set by ID
router.delete('/:id', deleteFlashcardSet);

module.exports = router;