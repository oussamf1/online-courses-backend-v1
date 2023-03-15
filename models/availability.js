// the availability will have time intervals that the tutor is available in stored in a table plus the course that he can teach his name etc
// exemple tutor Oussama : teaches minecraft /Python Roblox
// Tuesday 8-9
// Friday  9-10
// Saturday 11-10
const { number, required } = require("joi");
const mongoose = require("mongoose");
const dateSchema = mongoose.Schema({
  // startingDate: {
  //   type: Date,
  //   required: true,
  // },
  courses: [
    {
      courseTitle:{
        type : String,
      },
    },
  ],
  tutor: {
    type: String,
    required: true,
  },
  dates: [
    {
      day: {
        type: String,
      },
      time: {
        type: String,
      },
      reserved :{
        type:Boolean,
        default:false,
      }
    },
  ],
});
module.exports = mongoose.model("availabilities", dateSchema);
