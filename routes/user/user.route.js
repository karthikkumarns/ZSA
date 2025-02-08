const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/user.controllers");

router.post("/register", controller.userRegistration);

module.exports = router;
