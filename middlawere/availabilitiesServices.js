const Course = require("../models/course");
const Availability = require("../models/availability");
const { compareAsc, format } = require("date-fns");

exports.addAvailability = async (req, res, next) => {
  // let startingAt = new Date(
  //   Date.UTC(
  //     parseInt(req.body.year),
  //     parseInt(req.body.month),
  //     parseInt(req.body.startingDay)
  //   )
  // );
  // January i the Month 0
  // console.log(format(startingAt, "yyyy-MM-dd"));
  // console.log(startingAt.getDay());
  let availability = new Availability({
    tutor: req.body.tutor,
    // startingDate: startingAt,
  });
  await availability.save();
};

exports.deleteAvailability = async (req, res, next) => {
  console.log("delting");
  const availability = await Availability.findOneAndDelete({
    tutor: req.body.form.tutor,
  });
  console.log(availability);
};

exports.addDate = async (req, res, next) => {
  let date = {};
  date = { day: req.body.day, time: req.body.time };
  console.log(date);
  const availability = await Availability.find({ tutor: req.body.tutor });
  availability[0].dates.push(date);
  console.log(availability[0].dates);
  await availability[0].save();
};

exports.addCourse = async (req, res, next) => {
  let course = { courseTitle: req.body.course };
  console.log(course);
  const availability = await Availability.find({ tutor: req.body.tutor });
  availability[0].courses.push(course);
  await availability[0].save();
};

exports.deleteDate = async (req, res, next) => {
  let date = { day: "", time: "" };
  let s = req.body.form.date;
  date = {
    day: s.substr(0, s.indexOf("-")),
    time: s.substr(s.indexOf("-") + 1, s.length),
  };
  console.log(date);
  console.log(req.params);
  const availability = await Availability.findById(req.params.id);
  availability.dates.forEach((element) => {
    if (element.day == date.day && element.time == date.time) {
      const index = availability.dates.indexOf(element);
      if (index > -1) {
        availability.dates.splice(index, 1);
      }
    }
  });
  await availability.save();
};
exports.getTutorsList = async (req, res, next) => {
  let tutors = [];
  const availability = await Availability.find();
  availability.forEach((av) => {
    tutors.push(av.tutor);
  });
  console.log(tutors);
  res.send(tutors);
};
exports.getAvailabilities = async (req, res, next) => {
  const availability = await Availability.find();
  console.log(availability);
  res.send(availability);
};
exports.getTutorAvailability = async (req, res, next) => {
  const availability = await Availability.findById(req.params.id);
  console.log(availability);
  res.send(availability);
};
