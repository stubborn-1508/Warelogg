const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config({ path: "../config/config.env" });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



// Create Schema
const BookSchema = new Schema({
    order_id:{
        type: String
    },
    user_id: {
        type: String,
    },
    subUnit_id: {
        type: String
    },
    fromOcc: {
        type: Number,
        default: Date.now
    },
    toOcc: {
        type: Number,
        default: Date.now
    },
    Name: {
        type: String
    },
    Size: {
        type: String
    },
    Price: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    }
});


Book = mongoose.model('bookings', BookSchema);
module.exports = Book;
