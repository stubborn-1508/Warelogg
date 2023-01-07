const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config({ path: "../config/config.env" });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Schema for Rating
const RatingSchema = new Schema({
    warehouseID: [
        {type: Schema.Types.ObjectId, ref: "Warehouse"}, 
    ],

    ratings: [
        {
            star: Number,
            // givenBy: { type: mongoose.Schema.Types.ObjectId, ref: "Customer"}
        }
    ],

    computedRating: {
        type: Number,
        default: 0
    }
});


Rating = mongoose.model('ratings', RatingSchema);
module.exports = Rating;