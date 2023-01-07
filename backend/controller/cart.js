const Cart = require("../modals/cart");
const WareHouse = require("../modals/warehouse");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config({path: "../config/config.env"});

const addToCart = async (req, res) => {
    // console.log(req.body);
    const user_id = req.body.user_id;
    const cartContent = req.body.cartContent;
    const subUnitId = cartContent.subUnit_id;

    if(!cartContent.OccFrom || !cartContent.OccTo){
        res.status(400).json('Please choose the starting and ending dates');
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
            res.status(200).json('Successfully Added to Cart');
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
            res.status(200).json('Successfully Added to Cart');
        }
    }catch(err){
        res.send(err);
    }
}


module.exports = {
    addToCart
};