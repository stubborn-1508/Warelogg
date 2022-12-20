//for verify this is correct user or not
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../modals/user.js");

const authentication = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    // console.log("token " + token);
    if (!token) {
      return res.status(400).json("User not authorized");
    }
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log({ verified });
    if (!verified) {
      return res.json("verifyed" + false);
    }
    const user = await userModel.findOne({ _id: verified.id });
    // console.log("user" + user);
    if (!user) {
      return res.json("user" + false);
    }
    req.user = user;
    // return res.json(true);
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { authentication };
