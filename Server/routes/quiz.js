const express = require("express");
const { body } = require("express-validator");

const quizController = require('../controller/quiz');

const router = express.Router();

router.get("/:quizId", quizController.getQuiz);

router.put("/create", quizController.createQuiz);

router.post("/answer", quizController.answerQuiz);

router.delete("/delete", quizController.deleteQuiz);


module.exports = router;
