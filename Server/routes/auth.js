const express = require("express");
const { body } = require("express-validator");

const User = require('../module/user');
const authController = require('../controller/auth');

const router = express.Router();

router.put("/signup", [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid Email")
    .custom((value, { req }) => {
        return User.findAll({ where: { email: value } }).then((userDoc) => {
        if (userDoc.length !== 0) {
          return Promise.reject("E-Mail address already exists!");
        }
      });
    })
    .normalizeEmail(),

  body("password").trim().isLength({ min: 5 }),

  body("username").trim().not().isEmpty(),
], authController.signup);

router.post("/login", authController.login);

module.exports = router;
