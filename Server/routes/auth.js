const express = require("express");
const { body } = require("express-validator");

const User = require("../module/user");
const authController = require("../controller/auth");

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Bitte geben Sie richtigen Email ein !")
      .custom((value, { req }) => {
        return User.findAll({ where: { email: value } }).then((userDoc) => {
          if (userDoc.length !== 0) {
            return Promise.reject("E-Mail Address ist schon verwendet!");
          }
        });
      }),

    body("password", "Invalide Password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)().{8,50}$/),

    body("username").isLength({ min: 5 }),
  ],
  authController.signup,
);

router.post("/login", authController.login);

module.exports = router;
