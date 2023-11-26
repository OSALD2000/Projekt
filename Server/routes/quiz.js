const express = require("express");
const { checkSchema } = require("express-validator");
const create_validation = require("../util/validation/create_validation");
const answer_validation = require("../util/validation/answer_validation");

const quizController = require("../controller/quiz/quiz");

const router = express.Router();

router.get("/:quizId", quizController.getPrivateQuiz);

// TODO: update quiz


router.post(
  "/create",
  [checkSchema(create_validation)],

  quizController.createQuiz,
);

router.post(
  "/answer",
  [checkSchema(answer_validation)],
  quizController.answerQuiz,
);

router.delete("/delete/:quizId", quizController.deleteQuiz);

module.exports = router;
