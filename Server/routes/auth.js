const express = require("express");
const { body } = require("express-validator");

const User = require("../module/auth/user");
const authController = require("../controller/auth");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Bitte geben Sie richtigen Email ein !")
      .custom((value, { req }) => {
        return User.findAll({ where: { email: value } }).then((userDoc) => {
          if (userDoc.length !== 0) {
            return Promise.reject("E-Mail Address ist bereit verwendet!");
          }
        });
      }),

    body("password", "Invalide Password").matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)().{8,50}$/,
    ),

    body("username").isLength({ min: 5 }),
  ],
  authController.signup,
);

router.post("/login", authController.login);

router.post(
  "/emailverification",
  [
    body("email")
      .isEmail()
      .withMessage("der zum bestaetigen Email wurde nicht gesendet!"),
    body("verificationCode").isLength({ min: 5 }),
  ],
  authController.postEmailverification,
);

router.get("/emailverification/:email", authController.getEmailverification);

router.get(
  "/again/emailverification/:email",
  authController.getEmailverificationagain,
);

module.exports = router;
