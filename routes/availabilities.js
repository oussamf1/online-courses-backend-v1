const availabilityServices = require("../middlawere/availabilitiesServices");
const express = require("express");
const admin = require("../middlawere/admin");
const auth2 = require("../middlawere/auth2");
const router = express.Router();
const _ = require("lodash");
router.post("/add", auth2, admin, availabilityServices.addAvailability);
router.post("/delete", auth2, admin, availabilityServices.deleteAvailability);
router.post("/addDate", auth2, admin, availabilityServices.addDate);
router.post("/deleteDate/:id", availabilityServices.deleteDate);
router.post("/addCourse", auth2, admin, availabilityServices.addCourse);
router.get("/getTutors", availabilityServices.getTutorsList);
router.get("/getAvailabilities", availabilityServices.getAvailabilities);
router.get(
  "/getTutorAvailability/:id",
  availabilityServices.getTutorAvailability
);
module.exports = router;
