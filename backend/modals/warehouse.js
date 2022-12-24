const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config({ path: "../config/config.env" });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Create Schema
const WareHouseSchema = new Schema({
    user_id: {
        type: Number,
        ref: 'User',
        field: "user_id"
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
    length: {
        type: String,
        required: true
    },
    width: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    features: [
        {
            type: String
        }
    ],
    images: [
        {
            type: String
        }
    ]
});


WareHouse = mongoose.model('warehouses', WareHouseSchema);
module.exports = WareHouse;
