const Course = require("../models/course");
const Order = require("../models/order");
const Date = require("../models/booking");
const Availability = require("../models/availability");
const { compareAsc, format } = require("date-fns");
exports.enterDate = async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  let date = new Date({
    course: req.params.id,
    courseTitle: course.title,
    day: req.body.day,
    time: req.body.time,
  });
  await date.save();
  next();
};
exports.selectCoursesDates = async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  const order = await Order.findById(req.params.id);
  if (course == undefined) {
    key = order.courseTitle;
  }
  if (course != undefined) {
    key = course.title;
  }
  const availability = await Availability.find({
    courses: { $elemMatch: { courseTitle: key } },
  });

  // res.send({
  //   dates: finalAvailability.dates,
  //   tutor: finalAvailability.tutor,
  // });
  let datesList = [];
  let dateAtutor = {};
  availability.forEach(function (av) {
    av.dates.forEach(function (date) {
      if (date.reserved == false) {
        // dateAtutor.d = date;
        // dateAtutor.tutor = av.tutor;
        dateAtutor = { d: date, tutor: av.tutor };
        datesList.push(dateAtutor);
        // unreservedDates = unreservedDates + 1;
        // datesList.push(date);{}
      }
      // if (unreservedDates > max) {
      //   max = unreservedDates;
      //   finalAvailability = av;
      //   av.f;
      // }
    });
  });
  // if (max > 0) {
  // no availability to send
  console.log("dddddd", datesList);
  res.send({
    dateAndTutor: datesList,
  });
  // }
};
