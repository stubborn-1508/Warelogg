const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const Razorpay = require("razorpay");
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: "./config/config.env" });

const app = express();

const _dirname = path.dirname("");
const buildpath = path.join(__dirname, "../frontend/build");

app.use(express.static(buildpath));

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );

app.use(bodyParser.json());

app.use("/", require("./router/routes.js"));

// app.get("/api/getkey", (req, res) =>
//   res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
// );

// app.get("/", (req, res) => {
//   res.send("Hi");
// });

// app.use(cors({
//   origin: "http://localhost:3000",
// }));


const dbURL =  "mongodb://localhost:27017/mern-auth";
console.log(process.env.MONGODB_URI);

mongoose
    .connect(process.env.MONGODB_URI,
    { useUnifiedTopology:true, useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

const port = 5000;

app.listen(port,()=>console.log(`Server up and running on port ${port}`));