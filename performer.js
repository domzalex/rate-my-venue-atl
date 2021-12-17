const mongoose = require('mongoose');

const performerPostSchema = new mongoose.Schema({
    venue: {
        type: String,
        required: true
    },
    communication: {
        type: String,
        required: true
    },
    marketing: {
        type: String,
        required: true
    },
    stage: {
        type: String,
        required: true
    },
    management: {
        type: String,
        required: true
    },
    equipment: {
        type: String,
        required: true
    },
    engineer: {
        type: String,
        required: true
    },
    loadin: {
        type: String,
        required: true
    },
    timing: {
        type: String,
        required: true
    },
    pay: {
        type: String,
        required: true
    },
    reliability: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    contact: { //contact for venue/promoter//
        type: String,
        required: true
    }
});

module.exports = mongoose.model('performerPost', performerPostSchema);