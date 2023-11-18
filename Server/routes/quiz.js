const express = require("express");
const { body } = require("express-validator");

const quizController = require("../controller/quiz/quiz");

const router = express.Router();

router.get("/:quizId", quizController.getPrivateQuiz);

// TODO: update quiz


// TODO: add validations for incomming quiz questions
router.post("/create", quizController.createQuiz);


// TODO: add validations for incomming questions if all id gultig
router.post("/answer", quizController.answerQuiz);



router.delete("/delete/:quizId", quizController.deleteQuiz);

module.exports = router;
