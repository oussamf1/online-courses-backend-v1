const auth2 = require("../middlawere/auth2");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const admin = require("../middlawere/admin");
const orderServices = require("../middlawere/orders");
router.get("/", auth2, orderServices.getOrders);
module.exports = router;
