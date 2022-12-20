const User = require("../modals/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config({path: "../config/config.env"});

const register = async (req, res) => {
  const { name, email, password,mobile, username, state } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json("Please fill the fields properly!!");
  }

  try {
    // console.log("done");
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json("Email already exist!!!");
    }else {
      const user = new User({
        name: name,
        email: email,
        password: password,
        contactNumberMobile: mobile,
        username: username,
        state: state,
      });
      const rounds = 10;
      bcrypt.genSalt(rounds, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user
            .save()
            .then((user) => res.status(200).json('User registered successfully'))
            .catch((err) => console.log(err));
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      // token = userLogin.generateAuthToken();

      if (!isMatch) {
        res.status(400).json("Invalid credentials");
      } else {
        const token = jwt.sign(
          { id: userLogin._id, email: userLogin.email },
          process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30d'
        }
        );
        return res.status(200).json({message: "User logged in successfully!!", token: token});
      }
    } else {
      res.status(400).json("User not found");
    }
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async (req, res) => {
  // console.log(req.user);
  return res.json(req.user);
}

module.exports = {
  // getAllUser,
  register,
  login,
  getAllUsers
  // deleteUser,
  // userTokenvalid,
};
