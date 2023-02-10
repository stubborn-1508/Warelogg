const Warehouse = require("../modals/warehouse");
const Rating = require("../modals/rating");
const User = require("../modals/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const emailValidator = require("deep-email-validator");
require("dotenv").config({ path: "../config/config.env" });

const addReview = async (req, res) => {
  const { comment, stars, user_id, warehouse_id } = req.body;
  if(!user_id)
    return res.status(401).json("User not logged in");
  if(!comment || !stars)
    return res.status(422).json("Please fill all the fields");
  try{
    const user = await User.findOne({user_id}).lean();
    const name = user.name;
    // console.log(name);
    const review = new Rating({
        name,
        warehouse_id,
        comment,
        stars,
        user_id
      });
    //   console.log(review);
      review.save();
      return res.status(200).json("Review added successfully!");
  }catch{
    return res.status(402).json({message: "Something went wrong!!"});
  }  
};

const getReview = async (req, res) => {
  const id = req.body.warehouse_id
  try{
    const data = await Rating.find({ warehouse_id: id }).lean();
    return res.status(200).json(data);
  }catch{
    res.status(400).json("Error, fetching reviews");
  }
};

const canWriteReview = async(req, res) => {
  const warehouse_id = req.body.warehouse_id;
  const user_id = req.body.user_id;
  try{
    const data = await Warehouse.findById(warehouse_id).lean();
    if(data.user_id == user_id)
      res.json({ message: false });
    // similarly check for if the user had previously booked or not
    // and any one of them is false return false else return true 
    else 
     res.json({ message: true });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

module.exports = {
  addReview,
  getReview,
  canWriteReview
};
