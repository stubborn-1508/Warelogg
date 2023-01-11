const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/auth");
const userController = require("../controller/user");
const warehouseController = require("../controller/warehouse");
const cartController = require("../controller/cart");
const paymentController = require("../controller/payment");

// router.get("/allusers", authentication, userController.getAllUser);

router.post("/register", userController.register);

router.post("/loginUser", userController.login);

router.get("/getAllUsers", authentication, userController.getAllUsers);

router.post("/warehouseRegister", warehouseController.warehouseRegister);

router.get("/getAllWarehouse", warehouseController.getAllWarehouse);

router.post("/getAllMyWareHouses", warehouseController.getAllMyWareHouses);

router.post("/getMyWareHouses", warehouseController.getMyWareHouses);

router.post("/editPrice", warehouseController.editPrice);

router.post("/verifyWarehouse", warehouseController.verifyWarehouse);

router.post("/addToCart", cartController.addToCart);

router.post("/getMyCart", cartController.getMyCart);

router.post("/deleteCart", cartController.deleteCart);

router.post("/checkout", paymentController.checkout);

router.post("/paymentVerification", paymentController.paymentVerification);

router.post("/assignCarts", cartController.assignCarts);

// router.delete("/delete/:id", authentication, userController.deleteUser);

// router.post("/tokenIsValid", userController.userTokenvalid);

module.exports = router;