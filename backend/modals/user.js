const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config({ path: "../config/config.env" });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String
    },
    contactNumberMobile: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    state: {
        type: String
    },
    profileImage: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// UserSchema.pre('save', async function(next){
//     if(this.isModified('password')){
//         this.password = bcrypt.hash(this.password,12);
//         this.cpassword = bcrypt.hash(this.cpassword,12);
//     }
//     next();
// });

// UserSchema.methods.generateAuthToken = async function(){
//     try{
//         let token = jwt.sign({_id: this.user_id},process.env.SECRET_KEY);
//         this.tokens = ths.tokens.concat({token: token});
//         await this.save();
//         return token;
//     }catch(err){
//         console.log(err);
//     }
// }

User = mongoose.model('users', UserSchema);
module.exports = User;
