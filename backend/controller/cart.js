const Cart = require("../modals/cart");
const WareHouse = require("../modals/warehouse");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config({path: "../config/config.env"});

const addToCart = async (req, res) => {
    const user_id = req.body.user_id;
    const cartContent = req.body.cartContent;
    const subUnitId = cartContent.subUnit_id;

    if(!cartContent.OccFrom || !cartContent.OccTo){
        return res.status(400).json('Please choose the starting and ending dates');
    }
    
    try{
        const cartData = await Cart.findOne({user_id: user_id}).lean();
        if(!cartData){
            const cart = new Cart({
                user_id,
                cartContent: [cartContent]
            });
            const waitRes1 = await cart.save();
            const waitRes2 = await WareHouse.updateOne({"subUnits._id": subUnitId}, {
                $set: {
                    "subUnits.$.isInCart": true
                }
            }, function(err) {
                console.log(err);
            });
            return res.status(200).json('Successfully Added to Cart');
        }else{
            const waitRes1 = await Cart.updateOne(
                { user_id: user_id },
                { $push: { cartContent: cartContent } }
            );
            const waitRes2 = await WareHouse.updateOne({"subUnits._id": subUnitId}, {
                $set: {
                    "subUnits.$.isInCart": true
                }
            }, function(err) {
                console.log(err);
            });
            return res.status(200).json('Successfully Added to Cart');
        }
    }catch(err){
        res.send(err);
    }
}

const getMyCart = async(req, res) => {
    const id = req.body.id;
    const data = await Cart.findOne({user_id: id}).clone().lean();
    res.send(data);
}

const deleteCart = async (req,res) => {
    const id = req.body.id;
    const warehouse_id = req.body.warehouse_id;
    const subUnit_id = req.body.subUnit_id;
    try {
        await Cart.updateOne({user_id: id},
            {$pull: {cartContent: {subUnit_id: subUnit_id}}},
            { safe: true, multi: false }
        ).clone();
        await WareHouse.updateOne({"subUnits._id": subUnit_id}, {
            $set: {
                "subUnits.$.isInCart": false
            }
        }, function(err) {
            console.log(err);
        }).clone();
        const data = await Cart.findOne({user_id: id}).clone().lean();
        res.send(data);
    }catch (err){
        res.status(400).json({error: err});
    }
}

const assignCarts = async (req, res) => {
    const user_id = req.body.user_id;
    const subUnit_id = req.body.subUnit_id;
    try{
        const waitRes = await Cart.findOne({user_id: user_id, "cartContent.subUnit_id": subUnit_id}).lean();
        if(waitRes){
            res.json({message: true});
        }else{
            res.json({message: false});
        }
    }catch(err){
        res.send(err);
    }
}

module.exports = {
    addToCart,
    getMyCart,
    deleteCart,
    assignCarts
};