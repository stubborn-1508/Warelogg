const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../modals/payment");
const Warehouse = require("../modals/warehouse");
const Book = require('../modals/book');
require("dotenv").config({path: "../config/config.env"});

const instance = new Razorpay({
  key_id: "rzp_test_Pv5XlbDcOtCgMo",
  key_secret: "OQG8K23UaFaqHRmJITSDUZ5l",
});

const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  let {bookCartData, userId} = req.body;
  bookCartData = bookCartData.map((ele) => {
    let obj = ele;
    obj.user_id = userId;
    obj.order_id = order.id;
    return obj;
  });

  // const book = new Book(bookCartData);

  const resp = await Book.insertMany(bookCartData);
  
  if(resp){
    res.status(200).json({
      success: true,
      order,
    });
  }else{
    res.status(400).json({
      success: false
    });
  }
};

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    await Book.deleteMany({order_id: razorpay_order_id});
    res.status(400).json({
      success: false,
    });
  }
};

const deleteOrder = async(req,res) => {
  const {order_id} = req.body;
  await Book.deleteMany({order_id: order_id});
  res.status(400).json({
    success: false,
  });
}

module.exports = {
    checkout,
    paymentVerification,
    deleteOrder
};