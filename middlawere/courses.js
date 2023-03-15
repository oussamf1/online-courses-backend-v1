const Course = require("../models/course");
const auth = require("../middlawere/auth");
const admin = require("../middlawere/admin");
const { findOneAndDelete, findByIdAndDelete } = require("../models/course");

exports.deleteCourse = async (req, res, next) => {
  await Course.findByIdAndDelete(req.params.id);
  next();
};
exports.addCourse = async (req, res, next) => {
  let course = new Course({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    courseType: req.body.courseType,
  });
  await course.save();
  next();
};
exports.getRegularCourses = async (req, res, next) => {
  const courses = await Course.find({ courseType: "Regular" });
  res.send(courses);
};
exports.getTrialCourses = async (req, res, next) => {
  const courses = await Course.find({ courseType: "Trial" });
  res.send(courses);
};
