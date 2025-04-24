const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false, // Do not return password by default
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// You might add pre-save middleware here later if needed (e.g., for password hashing if not done in controller)

module.exports = mongoose.model('User', UserSchema);