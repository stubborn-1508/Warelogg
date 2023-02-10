const mongoose = require('mongoose');
const Warehouse = require("../modals/warehouse");
const Subunit = require("../modals/subunit");
require("dotenv").config({path: "../config/config.env"});

// API for warehouse registration
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
            user_id: mongoose.Types.ObjectId(user_id),
            name: name,
            email: email,
            businessName: businessName,
            contactNumberMobile: contactNumberMobile,
            businessAddress: businessAddress,
            city: city,
            state: state,
            zip: zip,
            features: features
        });
        let warehouse_id = null;
        await warehouse.save()
        .then(res => warehouse_id = mongoose.Types.ObjectId(res._id))
        .catch(err => console.log(err))
        if(warehouse_id){
            subUnits.map(async (ele,ind) => {
                try{
                    ele.warehouse_id = warehouse_id;
                    const subunit = new Subunit(ele);
                    const resSubunitReg = await subunit.save();
                    if(resSubunitReg){
                        return res.status(200).json({message: 'WareHouse registered successfully'});
                    }else{
                        return res.status(401).json({message: "Subunits are not saved properly"});
                    }
                }catch(err){
                    console.log(err);
                }
            });
        }else{
            return res.status(401).json({message: "Subunits are not saved properly"});
        }
    } catch (err) {
        return res.status(402).json({message: "Something went wrong!!"});
    }
}

// API to fetch all warehouses
const getAllWarehouse = async (req,res) => {
    try{
        const data = await Warehouse.find({});
        return res.status(200).json({data: data});
    }catch(err){
        return res.status(402).json({message: "Something went wrong!!"});
    }
}

// get user warehouse
const getUserWareHouses = async (req,res) => {
    const userID = req.body.data;
    try{
        const data = await Warehouse.find({user_id: userID}).lean();
        return res.status(200).json({data: data});
    }catch(err){
        return res.status(402).json({message: "Something went wrong!!"});
    }
}

// 
const getWarehouseWithSubunit = async (req,res) => {
    const warehouse_id = req.body.data;
    try{
        const warehouse = await Warehouse.findOne({_id: warehouse_id}).clone().lean();
        const subunits = await Subunit.find({warehouse_id: warehouse_id}).clone().lean();
        return res.status(200).json({warehouse, subunits});
    }catch(err){
        return res.status(402).json({message: "Something went wrong!!"});
    }
}

// verify warehouse via admin
const verifyWarehouse = async (req,res) => {
    const id = req.body.id;
    try{
        const data = await Warehouse.updateOne({_id: id}, {$set:{
            isVerified: true
        }}, function(err){
            console.log(err);
        });
        res.send(data);
    }catch(err){
        return res.status(402).json({message: "Something went wrong!!"});
    }
}

const getSubunit = async (req,res) => {
    const subunit_id = req.body.id;
    try{
        const subunit = await Subunit.findOne({_id: subunit_id}).clone().lean();
        const warehouse_id = subunit.warehouse_id;
        const warehouse = await Warehouse.findOne({_id: warehouse_id}).clone().lean();
        if(subunit && warehouse){
            return res.status(200).json({subunit, warehouse});
        }else{
            return res.status(402).json({message: "Something went wrong!!"});
        }
    }catch(err){
        return res.status(402).json({message: "Something went wrong!!"});
    }
} 

module.exports = {
    warehouseRegister,
    getAllWarehouse,
    getUserWareHouses,
    getWarehouseWithSubunit,
    verifyWarehouse,
    getSubunit
};
  