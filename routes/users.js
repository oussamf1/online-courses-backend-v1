const bcrypt = require("bcrypt");
const userServices = require("../middlawere/users");
const _ = require("lodash");
const Token = require("../models/token");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("../middlawere/auth");
const { check, validationResult, body } = require("express-validator");

router.get("/orders", auth, userServices.getOrders);

router.post(
  "/",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("email is required")
      .isEmail()
      .normalizeEmail()
      .withMessage("please enter a valid email"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("please enter a password with a minimum of 6 charachters"),
    check("firstName").not().isEmpty().withMessage("first Name  is required"),
    check("lastName").not().isEmpty().withMessage("last Name  is required"),
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        console.log("differnet");
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("user already registred");
    user = new User(
      _.pick(req.body, [
        "password",
        "firstName",
        "lastName",
        "email",
        "isAdmin",
      ])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
  }
);
module.exports = router;
