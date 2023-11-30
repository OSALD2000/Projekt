const create_quiz_object = require("../../util/quiz/create_quiz_object");

const Quiz = require("../../module/quiz/quiz");

const getPrivateQuiz = async (req, res, next) => {
  try {
    const quizId = req.params.quizId;

    const quiz = await Quiz.findByPk(quizId);

    if (!quiz.getDataValue('visibility')) {
      res.status(401).json({ message: 'not authorised quiz is not public' });
    }

    const quiz_object = await create_quiz_object(quiz, false);

    if (!quiz_object) {
      res.status(442).json({ quizId: quizId, message: "quiz not found" });
    }

    res.status(200).json({ quizId: quizId, quiz: quiz_object });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getPrivateQuiz;
