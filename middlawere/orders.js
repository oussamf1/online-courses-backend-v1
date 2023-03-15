const Order = require("../models/order");
exports.getOrders = async (req, res, next) => {
  const orders = await Order.find();
  res.send(orders);
};


