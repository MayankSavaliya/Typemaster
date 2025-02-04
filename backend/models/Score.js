const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    wpm: {
        type: Number,
        required: true
    },
    accuracy: {
        type: Number,
        required: true
    },
    duration: Number,
    mode: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Score', scoreSchema);