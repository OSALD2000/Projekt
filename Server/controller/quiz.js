const uuid = require("uuid");

const requestErrorHandler = require("../util/requestValidation");
const create_quiz_object = require("../util/create_quesion/create_quiz_object");

const VISIBILITY = require("../module/enum/VISIBILITY");
const QUESTIONTYPE = require("../module/enum/QUESTIONTYPE");

const User = require("../module/auth/user");
const Quiz = require("../module/quiz/quiz");

exports.getPrivateQuiz = async (req, res, next) => {
  try {
    const quizId = req.params.quizId;

    const quiz = await Quiz.findByPk(quizId);

    // TODO : quiz validation if EXISTS
    const quiz_object = await create_quiz_object(quiz);

    if (!quiz_object) {
      res.status(442).json({ quizId: quizId, message: "quiz not found" });
    }

    res.status(200).json({ quizId: quizId, quiz: quiz_object });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createQuiz = async (req, res, next) => {
  try {
    requestErrorHandler(req);

    const userId = req.userId;
    const questions = req.body.questions;
    const question_number = questions.length;
    const quizCategory = req.body.quizCategory;
    const required_points = req.body.required_points;
    const quizId = uuid.v4();
    const visibility =
      req.body.visibility.toUpperCase() === VISIBILITY.PRIVATE ? false : true;

    const user = await User.findByPk(userId);

    const quiz = await user.createQuiz({
      _id: quizId,
      category: quizCategory,
      question_number: question_number,
      required_points: required_points,
      visibility: visibility,
    });

    for (const req_question of questions) {
      const category = QUESTIONTYPE.getType(
        req_question.category.toUpperCase(),
      );

      const question = await quiz.createQuestion({
        _id: uuid.v4(),
        question_value: req_question.question_value,
        weight: req_question.weight,
        category: category,
      });

      if (category === QUESTIONTYPE.CHOICEONE) {
        const choiceone = await question.createChoiceone({
          _id: uuid.v4(),
          right_answer: req_question.right_answer,
        });
      }

      if (category === QUESTIONTYPE.MULTIPLECHOICE) {
        const multipleChoice = await question.createMultipleChoice({
          _id: uuid.v4(),
        });
      }

      if (category === QUESTIONTYPE.ORDERING) {
        const ordering = await question.createOrdering({
          _id: uuid.v4(),
        });
      }

      if (category === QUESTIONTYPE.TRUEORFALSE) {
        const trueorfalse = await question.createTrueorfalse({
          _id: uuid.v4(),
        });
      }

      if (category === QUESTIONTYPE.FILLINTHEBLANK) {
        const fillInTheBlank = await question.createFillInTheBlank({
          _id: uuid.v4(),
        });
      }

      for (const req_answers of req_question.answers) {
        await question.createOption({
          _id: uuid.v4(),
          value: req_answers.value,
        });
      }
    }

    res
      .status(201)
      .json({ message: "Quiz created successfully", quizId: quizId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.answerQuiz = (req, res, next) => {};


// TODO: add validations for incomming quiz if EXISTS
exports.deleteQuiz = async (req, res, next) => {
  try {
    const userId = req.userId;
    const quizId = req.params.quizId;

    const user = await User.findByPk(userId);
    const quiz = await user.getQuizzes({
      where: {
        _Id: quizId,
      },
    });

    await quiz[0].destroy();

    res
      .status(200)
      .json({ message: "Quiz deleted successfully", quizId: quizId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
