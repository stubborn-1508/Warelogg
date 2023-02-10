const User = require("../modals/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const emailValidator = require('deep-email-validator');
require("dotenv").config({ path: "../config/config.env" });

async function isEmailValid(email) {
  return emailValidator.validate(email)
}

const register = async (req, res) => {
  const { name, email, password, mobile, username, state } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json("Please fill the fields properly!!");
  }

  try {
    // console.log("done");
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json("Email already exist!!!");
    } else {
      const data = await isEmailValid(email);
      // console.log(data);
      if(!data.valid)
      {
        return res.status(400).json("Please enter valid email");
      }
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
            .then((user) =>
              res.status(200).json("User registered successfully")
            )
            .catch((err) => console.log(err));
        });
      });
    }
  } catch (err) {
    return res.status(402).json({message: "Something went wrong!!"});
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
        return res.status(400).json("Invalid credentials");
      } else {
        const token = jwt.sign(
          { id: userLogin._id, email: userLogin.email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30d",
          }
        );
        return res.status(200).json({
          message: "User logged in successfully!!",
          token: token,
          id: userLogin._id,
        });
      }
    } else {
      return res.status(400).json("User not found");
    }
  } catch (err) {
    return res.status(402).json({message: "Something went wrong!!"});
  }
};

const getAllUsers = async (req, res) => {
  return res.json(req.user);
};

const sendEmail = async (req, res) => {
  // need to improve the functionalities

  const output = `
    <p>Your OTP verification code is 9999</p>
  `;

  // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "dejon.kunde@ethereal.email",
      pass: "58P9CXmzGw7DkmvvGM",
    },
    //   // tls: {
    //   //   rejectUnauthorized: false,
    //   // },
  });

  // let transporter = nodemailer.createTransport({
  //   host: "mail.YOURDOMAIN.com",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: "YOUREMAIL", // generated ethereal user
  //     pass: "YOURPASSWORD", // generated ethereal password
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Nodemailer Contact" dejon.kunde@ethereal.email', // sender address
    to: "dejon.kunde@ethereal.email", // list of receivers
    subject: "Node Contact Request", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  };

  // let mailOptions = {
  //   from: '"Nodemailer Contact" <your@email.com>', // sender address
  //   to: "RECEIVEREMAILS", // list of receivers
  //   subject: "Node Contact Request", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: output, // html body
  // };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send("Email has been sent");
  });
};

module.exports = {
  register,
  login,
  getAllUsers,
  sendEmail,
};
