const express = require("express");
const admin = require("../middlawere/admin");
const accountServices = require("../middlawere/account");
const router = express.Router();

router.get("/",admin, accountServices.setAccount);
module.exports = router;
