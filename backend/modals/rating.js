const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config({ path: "../config/config.env" });

// Schema for Rating
const RatingSchema = new Schema({
    warehouse_id: {
        type: Schema.Types.ObjectId,
        ref: 'warehouses',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    stars: {
        type: Number,
        required: true
    }
});


Rating = mongoose.model('ratings', RatingSchema);
module.exports = Rating;