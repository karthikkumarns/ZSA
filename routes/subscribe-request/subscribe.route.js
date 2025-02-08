const express = require("express");
const router = express.Router();
const controller = require("../../controllers/subscribe-request/subscribe.controller");

router.post("/subscribe-request", controller.subscriptionRequest);

module.exports = router;
