const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Course = require("../models/course");
const { User } = require("../models/user");
const _ = require("lodash");
const Order = require("../models/order");
const { Console } = require("winston/lib/winston/transports");
const Availability = require("../models/availability");
const order = require("../models/order");
exports.checkoutCourse = async (req, res, next) => {
  await sleep(1000);
  const order = await Order.find({
    studentName: req.query.studentName,
    numberOfClasses: req.query.numberOfClasses,
    course: req.query.id,
  });
  let dates = "";
  order[order.length - 1].listOfDates.forEach(function (date) {
    dates = dates + date + " / ";
  });
  console.log("here2");
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.params.id);
  if (!course) res.status(404).send("the course is invalid");
  const session = await stripe.checkout.sessions.create({
    //  payment_method_types: ["card"],
    success_url: "https://stark-escarpment-40731.herokuapp.com/success",
    cancel_url: "https://stark-escarpment-40731.herokuapp.com/courses",
    customer_email: user.email,
    client_reference_id: req.params.id,
    line_items: [
      {
        name: `${order[order.length - 1].courseTitle}`,
        amount: order[order.length - 1].finalPrice * 100,
        currency: "hkd",
        quantity: 1,
        description: dates,
      },
    ],
  });
  console.log("here1");
  updateOrderId(order[order.length - 1]._id, session.id);
  req.order = order[order.length - 1];
  res.status(200).json({
    id: session.id,
  });
};
exports.getCheckoutSession = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id, type: "regular" });
  await sleep(1000);
  // orders.forEach(async function (order) {
  //   const session = await stripe.checkout.sessions.retrieve(order.sessionId);
  //   updateOrderStatus(order._id, session.payment_status);
  // });
  const session = await stripe.checkout.sessions.retrieve(
    orders[orders.length - 1].sessionId
  );
  updateOrderStatus(orders[orders.length - 1]._id, session.payment_status);
  next();
};
exports.ordersSummary = async (req, res, next) => {
  const orders = await Order.find().or([
    { user: req.user._id, status: true },
    { type: "trial" },
  ]);
  res.send(orders);
};
exports.classesList = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  res.send({ classesList: order.listOfDates });
};
async function updateOrderId(id, sessionId) {
  try {
    const order = await Order.findById(id);
    order.sessionId = sessionId;
    await order.save();
  } catch (error) {
    console.log(error);
  }
}
async function updateOrderStatus(id, sessionPaymentStatus) {
  console.log("updating");
  const order = await Order.findById(id);
  console.log(order);
  let dateString = order.date;
  day = dateString.substr(0, dateString.indexOf("-"));
  time = dateString.substr(dateString.indexOf("-") + 1, dateString.length);
  const availability = await Availability.find({
    tutor: order.tutor,
  });
  availability[0].dates.forEach(function (date) {
    if (date.day == day && date.time == time) {
      date.reserved = true;
    }
  });
  if (sessionPaymentStatus == "paid") {
    order.status = true;
    await order.save();
    await availability[0].save();
  }
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
