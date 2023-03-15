const express = require("express");
const auth = require("../middlawere/auth");
const admin = require("../middlawere/admin");
const router = express.Router();
router.get("/", auth);
module.exports = router;
