const { number } = require("joi");
const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  courseType:{
    type:String,
    required:true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Courses", courseSchema);
