const express = require("express");
const user = require("../models/user");
const Course = require("../models/course");
const timeServices = require("../middlawere/bookingDates");
const router = express.Router();

router.post("/:id", timeServices.enterDate);
router.get("/:id", timeServices.selectCoursesDates);
module.exports = router;
