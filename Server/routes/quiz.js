const express = require("express");
const { checkSchema } = require("express-validator");
const create_validation = require("../util/validation/create_validation");
const answer_validation = require("../util/validation/answer_validation");
const is_auth = require("../middleware/is-auth");
const quizController = require("../controller/quiz/quiz");

const router = express.Router();


router.post(
  "/create", is_auth,
  [checkSchema(create_validation)],

  quizController.createQuiz,
);

router.post(
  "/answer", is_auth,
  [checkSchema(answer_validation)],
  quizController.answerQuiz,
);

router.delete("/delete/:quizId", is_auth, quizController.deleteQuiz);



module.exports = router;
