const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config({ path: "../config/config.env" });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Create Schema
const WarehouseSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    businessName:{
        type: String
    },
    contactNumber: {
        type: Number,
    },
    businessAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
    },
    features: [
        {
            type: String
        }
    ],
    isVerified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "none"
    },
    rating: {
        type: String,
        default: 0
    }
});


Warehouse = mongoose.model('warehouses', WarehouseSchema);
module.exports = Warehouse;
