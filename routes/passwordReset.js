const { User } = require("../models/user");
const Token = require("../models/token");
const sendEmail = require("../util/sendEmail");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("user with given email doesn't exist");
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `https://stark-escarpment-40731.herokuapp.com/password-reset/${user._id}/${token.token}`;
    //await sendEmail(user.email, "Password reset", link);
    console.log(link);

    res.send("password reset link sent to your email account");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});
router.post("/:userId/:token", async (req, res) => {
  try {
    // const schema = Joi.object({ password: Joi.string().required() });
    // const { error } = schema.validate(req.body);
    // if (error) return res.status(402).send(error.details[0].message);
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(401).send("invalid link or expired");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    console.log(token);
    if (!token) return res.status(403).send("Invalid link or expired");

    user.password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    await token.delete();
    console.log(user);

    res.send("password reset sucessfully.");
    console.log("password reset done");
  } catch (error) {
    console.log(error);
    res.send("An error occured");
  }
});

module.exports = router;
