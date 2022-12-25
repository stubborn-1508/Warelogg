const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config({ path: "../config/config.env" });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const subUnitSchema = new Schema({
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
    spaceOccupied: {
        type: Number,
        default: 0
    },
    fromOcc: {
        type: Number,
        default: Date.now
    },
    toOcc: {
        type: Number,
        default: Date.now
    },
    images: [
        {
            type: String
        }
    ]
});

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
    subUnits: [
        {
            type: subUnitSchema,
            required: true
        }
    ],
    features: [
        {
            type: String
        }
    ]
});


WareHouse = mongoose.model('warehouses', WareHouseSchema);
module.exports = WareHouse;
