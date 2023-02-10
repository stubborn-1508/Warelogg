const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config({ path: "../config/config.env" });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Create Schema
const CartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    subunit_id: {
        type: Schema.Types.ObjectId,
        ref: 'Subunit',
    },
});


Cart = mongoose.model('carts', CartSchema);
module.exports = Cart;
