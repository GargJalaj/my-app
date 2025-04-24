const express = require('express');
const { registerUser, loginUser, getMe, deleteAccount} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // Import protect middleware

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private route - requires valid token
router.get('/me', protect, getMe); // Apply protect middleware here
router.delete('/delete', protect, deleteAccount); 

module.exports = router;