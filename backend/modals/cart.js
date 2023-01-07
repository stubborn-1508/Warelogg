const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config({ path: "../config/config.env" });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const cartContentSchema = new Schema({
    warehouse_id: {
        type: String,
        required: true,
        ref: 'Warehouse',
        field: '_id'
    },
    subUnit_id: {
        type: String,
        required: true,
    },
    Name:{
        type: String,
        required: true
    },
    Size: {
        type: String,
        required: true
    },
    OccFrom: {
        type: String,
        required: true
    },
    OccTo: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    isPurchased: false
});

// Create Schema
const CartSchema = new Schema({
    user_id: {
        type: String,
        ref: 'User',
        field: "user_id"
    },
    cartContent: [
        {
            type: cartContentSchema,
        }
    ]
});


Cart = mongoose.model('carts', CartSchema);
module.exports = Cart;
