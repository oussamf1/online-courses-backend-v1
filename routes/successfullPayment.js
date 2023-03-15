const express = require("express");
const auth2 = require("../middlawere/auth2");
const bookingServices = require("../middlawere/bookingServices");
const invoiceServices = require("../middlawere/invoice");
const router = express.Router();
router.get(
  "/",
  auth2,
  bookingServices.getCheckoutSession,
  invoiceServices.sendInvoice
);
module.exports = router;
