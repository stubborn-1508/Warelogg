const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config({ path: "../config/config.env" });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Create Schema
const SubunitSchema = new Schema({
    warehouse_id: {
        type: Schema.Types.ObjectId,
        ref: 'Warehouse'
    },
    length: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true,
    },
    height:{
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [
        {
            type: String,
        }
    ],
    status: {
        type: String
    }
});


Subunit = mongoose.model('subunits', SubunitSchema);
module.exports = Subunit;