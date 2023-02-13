const Cart = require("../modals/cart");
const WareHouse = require("../modals/warehouse");
const Subunit = require("../modals/subunit");
const Book = require("../modals/book");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: "../config/config.env" });

const addToCart = async (req, res) => {
  const user_id = req.body.user_id;
  const subunit_id = req.body.subunit_id;
  try {
    const cart = new Cart({ user_id, subunit_id });
    cart.save();
    return res.status(200).json("Successfully Added to Cart");
  } catch (err) {
    res.status(400).json("Error!!");
  }
};

const getMyCart = async (req, res) => {
  const id = req.body.user_id;
  try {
    const data = await Cart.find({ user_id: id }).lean();
    const data1 = data.map((element) => element.subunit_id);
    let data2 = [];
    for (index = 0; index < data1.length; index++){
      let range = await Book.findOne({user_id: id, subunit_id: data1[index]}).clone().lean();
      let subunit = await Subunit.findOne({ _id: data1[index] });
      const warehouse_id = subunit.warehouse_id;
      let warehouse = await WareHouse.findOne({_id: warehouse_id}).clone().lean();
      data2.push({
        name: warehouse.name,
        price: subunit.price,
        occupiedFrom: range.occupiedFrom,
        occupiedTo: range.occupiedTo,
        subunit_id: subunit._id
      });
    }
    // console.log(data2);
    return res.status(200).json(data2);
  } catch (err) {
    res.status(400).json("Error!!");
  }
};

const deleteCart = async (req, res) => {
  const user_id = req.body.user_id;
  const subunit_id = req.body.subunit_id;
  try {
    await Cart.deleteOne({ user_id, subunit_id });
    await Book.deleteOne({ user_id, subunit_id });
    return res.status(200).json("Successfully deleted from Cart");
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const assignCarts = async (req, res) => {
  const user_id = req.body.user_id;
  const subunit_id = req.body.subunit_id;
  try {
    const waitRes = await Cart.findOne({ user_id, subunit_id }).lean();
    if (waitRes) {
      res.json({ message: true });
    } else {
      res.json({ message: false });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  addToCart,
  getMyCart,
  deleteCart,
  assignCarts,
};
