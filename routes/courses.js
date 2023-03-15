const auth2 = require("../middlawere/auth2");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Course = require("../models/course");
const admin = require("../middlawere/admin");
const bookingServices = require("../middlawere/bookingServices");
const courseServices = require("../middlawere/courses");
router.post("/", courseServices.addCourse);
router.delete("/:id", [auth2, admin], courseServices.deleteCourse);
router.get("/regular", courseServices.getRegularCourses);
router.get("/trial", courseServices.getTrialCourses);

module.exports = router;
