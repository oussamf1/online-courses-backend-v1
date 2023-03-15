const Order = require("../models/order");
const { User } = require("../models/user");
const { findById } = require("../models/order");

exports.getOrders = async (req, res, next) => {
  console.log(req.user);
  const orders = await Order.find({ user: req.user });
  res.send(orders);
  next();
};
