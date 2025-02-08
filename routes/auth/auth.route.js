const express = require("express");
const router = express.Router();
const controller = require("../../controllers/auth/auth.controller");

router.post("/login", controller.Login);
router.post("/verify-otp", controller.verifyOTP);

module.exports = router;
