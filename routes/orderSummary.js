const express = require("express");
const auth2 = require("../middlawere/auth2");
const router = express.Router();
const formServices = require("../middlawere/checkoutForm");
const bookingServices = require("../middlawere/bookingServices");
router.get("/", auth2, bookingServices.ordersSummary);
router.post("/changeDate/:id", auth2, formServices.changeDate);
router.get("/classesList/:id", bookingServices.classesList);
module.exports = router;
