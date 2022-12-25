const User = require("../modals/user");
const Warehouse = require("../modals/warehouse");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config({path: "../config/config.env"});


const warehouseRegister = async (req,res) => {
    const { user_id,
        name,
        email,
        businessName,
        contactNumberMobile,
        businessAddress,
        city,
        state,
        zip,
        subUnits,
        features } = req.body;

    if(!user_id){
        return res.status(401).json("User not logged in");
    }

    if (!name&&!email&&!businessName&&!contactNumberMobile&&!businessAddress&&!city&&!state&&!zip&&!subUnits) {
        return res.status(422).json("Please fill all the fields");
    }
    // console.log(subUnits);
    try {
        const warehouse = new Warehouse({
            user_id: user_id,
            name: name,
            email: email,
            businessName: businessName,
            contactNumberMobile: contactNumberMobile,
            businessAddress: businessAddress,
            city: city,
            state: state,
            zip: zip,
            subUnits: subUnits,
            features: features
        });
        warehouse.save()
        .then((user) => res.status(200).json('WareHouse registered successfully'))
        .catch((err) => console.log(err));
        // res.status(200).json("temp done");
    } catch (err) {
        console.log(err);
    }
}

const getAllMyWareHouses = async (req,res) => {
    const userID = req.body.data;
    try{
        const data = await Warehouse.find({user_id: userID}).lean();
        res.send(data);
    }catch(err){
        res.send(err);
    }
}

const getMyWareHouses = async (req,res) => {
    const id = req.body.data;
    try{
        const data = await Warehouse.findOne({_id: id}).lean();
        res.send(data);
    }catch(err){
        res.send(err);
    }
}

module.exports = {
    warehouseRegister,
    getAllMyWareHouses,
    getMyWareHouses
};
  