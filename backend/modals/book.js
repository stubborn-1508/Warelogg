const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config({ path: "../config/config.env" });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Create Schema
const BookSchema = new Schema({
    user_id: {
        type: Number,
        ref: 'User',
        field: "user_id"
    },
    subUnit_id: {
        type: String,
        required: true
    },
    name:{
        type: String
    },
    
});


Book = mongoose.model('bookings', BookSchema);
module.exports = Book;
