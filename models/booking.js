//we will add a bookind code that has the tutor reference the time and the course 
//when a course is booked we shift the availability by 30 mins for the tutor that have booked.

const { number } = require("joi");
const mongoose = require("mongoose");
const dateSchema = mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
  },
  courseTitle: {
    type: String,
    require: true,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  reserved: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("dates", dateSchema);