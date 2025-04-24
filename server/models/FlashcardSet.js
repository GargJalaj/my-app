const mongoose = require('mongoose');

// Define sub-schemas for better structure and validation
const SummarySchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Summary title is required'] },
    summary: { type: String, required: [true, 'Summary content is required'] },
    estimatedTime: { type: String, required: [true, 'Estimated time is required'] },
}, {_id: false});

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: [true, 'Question is required'] },
    answer: { type: String, required: [true, 'Answer is required'] },
}, {_id: false});

const FlashcardSetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Creates a reference to the User model
    },
    originalFileName: {
        type: String,
        required: false, // Make optional or required based on your needs
        trim: true,
    },
    summaries: {
        type: [SummarySchema],
        validate: [v => Array.isArray(v) && v.length >= 0, 'Summaries must be an array']
    },
    questions: {
        type: [QuestionSchema],
        validate: [v => Array.isArray(v) && v.length >= 0, 'Questions must be an array']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('FlashcardSet', FlashcardSetSchema);