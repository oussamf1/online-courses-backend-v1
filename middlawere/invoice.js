const sendEmail = require("../util/sendEmail");
const Order = require("../models/order");
const { User } = require("../models/user");
const { createInvoice } = require("./createInvoice.js");
const { escapeRegExp } = require("lodash");
exports.sendInvoice = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  const user = await User.findById(req.user._id);

  const sortedOrders = orders.slice().sort((a, b) => b.orderDate - a.orderDate);
  const order = sortedOrders[0];
  console.log(order);
  if (order.status == true) {
    console.log("invoice");

    const invoice = {
      client: {
        parentName: order.firstName,
        studentName: order.studentName,
      },
      courses: [
        {
          courseTitle: order.courseTitle,
          numberofClasses: order.numberOfClasses,
          amount: order.finalPrice,
        },
      ],
    };
    pdfString = await createInvoice(invoice, "invoice.pdf");
    // console.log("pdf string:", pdfString);
    await sendEmail(
      "tibor@hkcodingcamp.com",
      "invoice",
      "Dear Client please find below your invoice",
      pdfString
    );
    res.send({
      studentName: order.studentName,
      email: user.email,
    });
  }
};
