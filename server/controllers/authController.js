const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Set token expiry (e.g., 30 days)
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, msg: 'Please provide name, email, and password' });
    }
     if (password.length < 6) {
         return res.status(400).json({ success: false, msg: 'Password must be at least 6 characters long' });
    }

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, msg: 'User already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            // Don't send password back, even hashed
            res.status(201).json({
                success: true,
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id), // Send token upon successful registration
            });
        } else {
            res.status(400).json({ success: false, msg: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Registration Error:', error);
        // Handle potential Mongoose validation errors more gracefully
        if (error.name === 'ValidationError') {
             const messages = Object.values(error.errors).map(val => val.message);
             return res.status(400).json({ success: false, msg: messages.join('. ') });
        }
        res.status(500).json({ success: false, msg: 'Server error during registration' });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, msg: 'Please provide email and password' });
    }

    try {
        // Check for user by email, explicitly selecting the password field
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, msg: 'Invalid credentials' }); // Use 401 for auth errors
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, msg: 'Invalid credentials' }); // Use 401
        }

        // User matched, send response with token
         res.json({
                success: true,
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });

    } catch (error) {
         console.error('Login Error:', error);
         res.status(500).json({ success: false, msg: 'Server error during login' });
    }
};

// @desc    Get current logged-in user data
// @route   GET /api/auth/me
// @access  Private (requires token via protect middleware)
const getMe = async (req, res) => {
    // req.user is attached by the 'protect' middleware
    if (!req.user) {
         return res.status(404).json({ success: false, msg: 'User not found (error in middleware likely)' });
    }
    // Send back user data (password is already excluded by middleware)
    res.status(200).json({
        success: true,
        data: req.user,
    });
};


module.exports = {
    registerUser,
    loginUser,
    getMe,
};