const express = require("express");
const { body } = require("express-validator");

const is_auth = require("../middleware/is-auth");
const userController = require("../controller/user/user");

const router = express.Router();

router.get("/profile/daten", is_auth, userController.loadUserDaten);

router.get("/quiz/:quizId", is_auth, userController.loadQuiz);

router.put(
  "/update",
  [
    body("newPassword", "Invalide Password").matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)().{8,50}$/,
    ),
  ],
  is_auth,
  userController.userUpdatePassord,
);

module.exports = router;
