const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config({ path: "../config/config.env" });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Create Schema
const WareHouseSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    businessName:{
        type: String
    },
    contactNumberMobile: {
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
    dimension: {
        type: String,
        required: true
    },
    features: [
        {
            type: String
        }
    ],
    imageLink: {
        type: String
    }
});


WareHouse = mongoose.model('warehouses', WareHouseSchema);
module.exports = WareHouse;
