const { number } = require("joi");
const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sessionId: {
    type: String,
    default: null,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  finalPrice: {
    type: Number,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  numberOfClasses: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
  },
  listOfDates: [
    {
      type: String,
      required: true,
    },
  ],
  tutor: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  // paymentID: {
  // type: String,
  //: true,
  // },
  //dateOfPurchase: {
  // type: Date,
  //required: true,
  // },
});
module.exports = mongoose.model("orders", orderSchema);
