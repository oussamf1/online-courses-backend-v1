const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
router.get("/", async (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    })
    .send("cookie cleared");
});
router.post("/", async (req, res) => {
  console.log("here");
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.json({ auth: false, message: "invalid email or password" });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.json({ auth: false, message: "invalid email or password" });
  const token = user.generateAuthToken();
  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    })
    .json({ auth: true, message: "logged in", token });
});
module.exports = router;
//
