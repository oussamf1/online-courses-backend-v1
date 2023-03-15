const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Course = require("../models/course");
const { User } = require("../models/user");
const _ = require("lodash");
const Order = require("../models/order");
const { Console } = require("winston/lib/winston/transports");
const Availability = require("../models/availability");
exports.setAccount = async (req, res, next) => {
  const capabilities = await stripe.accounts.listCapabilities(
    "acct_1JMaDbCHCOrHmfBd"
  );
  console.log(capabilities);
};
