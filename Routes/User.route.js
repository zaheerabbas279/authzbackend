const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/User.controller");
// const multer = require("multer");

router.post("/addnew", UserController.addNew);
router.get("/listall", UserController.listall);
router.get("/:id", UserController.findUserById);
router.put("/:id", UserController.updateUser);
router.post("/uploadimage", UserController.uploadImage);

module.exports = router;
