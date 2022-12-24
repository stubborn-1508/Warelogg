const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/auth");
const userController = require("../controller/user");
const warehouseController = require("../controller/warehouse");

// router.get("/allusers", authentication, userController.getAllUser);

router.post("/register", userController.register);

router.post("/loginUser", userController.login);

router.get("/getAllUsers", authentication, userController.getAllUsers);

router.post("/warehouseRegister", warehouseController.warehouseRegister);

router.post("/getAllMyWareHouses", warehouseController.getAllMyWareHouses);

// router.delete("/delete/:id", authentication, userController.deleteUser);

// router.post("/tokenIsValid", userController.userTokenvalid);

module.exports = router;