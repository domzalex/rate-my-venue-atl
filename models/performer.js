const mongoose = require('mongoose');

const performerPostSchema = new mongoose.Schema({
    name: {
        type: String
    },
    venue: {
        type: String,
        required: true
    },
    communication: {
        type: Number,
        required: true
    },
    marketing: {
        type: Number,
        required: true
    },
    stage: {
        type: Number,
        required: true
    },
    management: {
        type: Number,
        required: true
    },
    equipment: {
        type: Number,
        required: true
    },
    engineer: {
        type: Number,
        required: true
    },
    loadin: {
        type: Number,
        required: true
    },
    timing: {
        type: Number,
        required: true
    },
    pay: {
        type: Number,
        required: true
    },
    reliability: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Performers', performerPostSchema);