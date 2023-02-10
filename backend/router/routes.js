const express = require("express");
const passport = require("passport");
const router = express.Router();
const { authentication } = require("../middleware/auth");
const userController = require("../controller/user");
const warehouseController = require("../controller/warehouse");
const cartController = require("../controller/cart");
const paymentController = require("../controller/payment");
const ratingController = require("../controller/rating");
// router.get("/allusers", authentication, userController.getAllUser);

router.post("/register", userController.register);

router.post("/loginUser", userController.login);

router.get("/googlelogin", passport.authenticate("google", {scope: ["profile"],}));
router.get("/login", passport.authenticate("google", { scope: ["profile"],successRedirect: process.env.FRONTEND_URL }));

router.get("/getAllUsers", authentication, userController.getAllUsers);

router.post("/warehouseRegister", warehouseController.warehouseRegister);

router.get("/getAllWarehouse", warehouseController.getAllWarehouse);

router.post("/getUserWareHouses", warehouseController.getUserWareHouses);

router.post("/getWarehouseWithSubunit", warehouseController.getWarehouseWithSubunit);

router.post("/verifyWarehouse", warehouseController.verifyWarehouse);

router.post("/addReview", ratingController.addReview);

router.post("/getReview", ratingController.getReview);

router.post("/canWriteReview", ratingController.canWriteReview);

router.post("/addToCart", cartController.addToCart);

router.post("/getMyCart", cartController.getMyCart);

router.post("/deleteCart", cartController.deleteCart);

router.post("/checkout", paymentController.checkout);

router.post("/paymentVerification", paymentController.paymentVerification);

router.post("/assignCarts", cartController.assignCarts);

router.post("/deleteOrder", paymentController.deleteOrder);

router.post("/getBooks", paymentController.getBooks);

router.post("/getSubunit", warehouseController.getSubunit);

router.post("/cancelBooking", paymentController.cancelBooking);

router.post("/sendEmail", userController.sendEmail);

// router.delete("/delete/:id", authentication, userController.deleteUser);

// router.post("/tokenIsValid", userController.userTokenvalid);

module.exports = router;
