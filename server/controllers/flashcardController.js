const FlashcardSet = require('../models/FlashcardSet');
const { processPdfWithAI } = require('../services/aiProcessor'); // Import the Node.js based AI service
const fs = require('fs').promises; // Using promises version of fs for async cleanup
const path = require('path'); // To construct file paths

// @desc    Upload PDF, generate flashcards using AI, and save
// @route   POST /api/flashcards/upload
// @access  Private
const uploadAndGenerateFlashcards = async (req, res) => {
    // protect middleware should have added req.user
    if (!req.user) {
        // This case should ideally be caught by the middleware, but double-check
        return res.status(401).json({ success: false, msg: 'Not authorized' });
    }

    if (!req.file) {
        return res.status(400).json({ success: false, msg: 'No file uploaded. Please upload a PDF file.' });
    }

    const userId = req.user._id; // Assuming middleware attaches user object with _id
    const filePath = req.file.path; // Path where multer saved the file
    const originalFileName = req.file.originalname;

    console.log(`[Controller] File received: ${originalFileName}, Path: ${filePath}, User: ${userId}`);

    try {
        // Step 1: Call the AI processing service with the file path
        console.log(`[Controller] Calling AI Processor for ${originalFileName}...`);
        const aiResult = await processPdfWithAI(filePath, originalFileName);
        // aiResult should be { summaries: [...], questions: [...] }

        console.log(`[Controller] AI Processing successful for ${originalFileName}. Saving to database...`);

        // Step 2: Create and save the new FlashcardSet document
        const newSet = await FlashcardSet.create({
            userId: userId,
            originalFileName: originalFileName,
            summaries: aiResult.summaries,
            questions: aiResult.questions,
        });

        console.log(`[Controller] FlashcardSet saved successfully. ID: ${newSet._id}`);

        // Step 3: Respond to the client
        res.status(201).json({
            success: true,
            msg: 'Flashcards generated and saved successfully!',
            data: newSet, // Send the created set back to the client
        });

    } catch (error) {
        console.error(`[Controller] Error processing file ${originalFileName}:`, error);
        // Send a more specific error message if possible
        res.status(500).json({
            success: false,
            msg: 'Failed to generate flashcards.',
            // Avoid sending detailed internal errors to the client in production
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
        });
    } finally {
        // Step 4: Clean up the uploaded temporary file regardless of success or failure
        try {
            await fs.unlink(filePath);
            console.log(`[Controller] Temporary file deleted: ${filePath}`);
        } catch (cleanupError) {
            // Log error but don't interfere with the response already sent
            console.error(`[Controller] Error deleting temporary file ${filePath}:`, cleanupError);
        }
    }
};

// @desc    Get all flashcard sets for the logged-in user
// @route   GET /api/flashcards
// @access  Private
const getUserFlashcardSets = async (req, res) => {
     if (!req.user) {
        return res.status(401).json({ success: false, msg: 'Not authorized' });
    }
    const userId = req.user._id;

    try {
        // Find sets belonging to the user, sort by newest first
        const sets = await FlashcardSet.find({ userId: userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: sets.length,
            data: sets,
        });
    } catch (error) {
        console.error('Error fetching user flashcard sets:', error);
        res.status(500).json({ success: false, msg: 'Server error fetching flashcard sets' });
    }
};

// @desc    Get a single flashcard set by its ID
// @route   GET /api/flashcards/:id
// @access  Private
const getFlashcardSetById = async (req, res) => {
     if (!req.user) {
        return res.status(401).json({ success: false, msg: 'Not authorized' });
    }
    const userId = req.user._id;
    const setId = req.params.id;

     // Validate if the ID is a valid MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(setId)) {
        return res.status(400).json({ success: false, msg: 'Invalid flashcard set ID format.' });
    }

    try {
        // Find the set by ID *and* ensure it belongs to the logged-in user
        const set = await FlashcardSet.findOne({ _id: setId, userId: userId });

        if (!set) {
            // If not found or doesn't belong to the user
            return res.status(404).json({ success: false, msg: 'Flashcard set not found or access denied.' });
        }

        res.status(200).json({
            success: true,
            data: set,
        });
    } catch (error) {
        console.error('Error fetching flashcard set by ID:', error);
         // Handle potential cast errors if ID format is technically valid but doesn't exist
         if (error.name === 'CastError') {
             return res.status(404).json({ success: false, msg: 'Flashcard set not found.' });
         }
        res.status(500).json({ success: false, msg: 'Server error fetching flashcard set' });
    }
};

// @desc    Delete a flashcard set by its ID
// @route   DELETE /api/flashcards/:id
// @access  Private
const deleteFlashcardSet = async (req, res) => {
    if (!req.user) {
       return res.status(401).json({ success: false, msg: 'Not authorized' });
   }
   const userId = req.user._id;
   const setId = req.params.id;

   if (!mongoose.Types.ObjectId.isValid(setId)) {
        return res.status(400).json({ success: false, msg: 'Invalid flashcard set ID format.' });
    }

   try {
       const set = await FlashcardSet.findById(setId);

       if (!set) {
           return res.status(404).json({ success: false, msg: 'Flashcard set not found.' });
       }

       // Check if the user owns the flashcard set
       if (set.userId.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, msg: 'User not authorized to delete this set.' }); // 403 Forbidden
       }

       await set.deleteOne(); // Use deleteOne() on the document instance

       res.status(200).json({ success: true, msg: 'Flashcard set deleted successfully.', data: {} }); // Return empty object on successful delete

   } catch (error) {
       console.error('Error deleting flashcard set:', error);
        if (error.name === 'CastError') {
             return res.status(404).json({ success: false, msg: 'Flashcard set not found.' });
         }
       res.status(500).json({ success: false, msg: 'Server error deleting flashcard set' });
   }
};


module.exports = {
    uploadAndGenerateFlashcards,
    getUserFlashcardSets,
    getFlashcardSetById,
    deleteFlashcardSet,
};