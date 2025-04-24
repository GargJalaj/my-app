const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Needed to potentially check if user still exists
require('dotenv').config();

const protect = async (req, res, next) => {
    let token;

    // Check for token in Authorization header (Bearer token)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token payload (assuming payload has id)
            // Optionally exclude password, even though it's not selected by default in model
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                 // Handle case where user associated with token no longer exists
                 return res.status(401).json({ success: false, msg: 'Not authorized, user not found' });
            }

            next(); // Proceed to the next middleware/controller
        } catch (error) {
            console.error('Token verification failed:', error);
            return res.status(401).json({ success: false, msg: 'Not authorized, token failed' });
        }
    }

    // If no token is found at all
    if (!token) {
        return res.status(401).json({ success: false, msg: 'Not authorized, no token' });
    }
};

module.exports = { protect }; // Export as an object for consistency