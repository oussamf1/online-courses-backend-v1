const Course = require("../models/course");
exports.getAllCourses = async (req, res, next) => {
  const courses = await Course.find();
  res.send(courses);
};
exports.getTrialCourses = async (req, res, next) => {
  const courses = await Course.find({ courseType: "Trial" });
};
exports.getCourse = async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) res.status(404).send("the course is invalid");
  res.send(course);
};
