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
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    subunit_id: {
        type: Schema.Types.ObjectId,
        ref: 'Subunit'
    },
    occupiedFrom: {
        type: Number,
        default: 0
    },
    occupiedTo: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'none'
    }
});


Book = mongoose.model('bookings', BookSchema);
module.exports = Book;
