const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    comment: {
        type: String,
        require: true
    }
}, { timestamps: true });

const reviewModel = new mongoose.model('reviews', reviewSchema);
module.exports = reviewModel;