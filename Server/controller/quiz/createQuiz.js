const uuid = require("uuid");

const requestErrorHandler = require("../../util/requestValidation");

const VISIBILITY = require("../../module/enum/VISIBILITY");
const QUESTIONTYPE = require("../../module/enum/QUESTIONTYPE");

const User = require("../../module/auth/user");

const createQuiz = async (req, res, next) => {
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
        question.createChoiceone({
          _id: uuid.v4(),
          right_answer: req_question.right_answer,
        });
      }

      //TODO: check if answers length <= optionslength
      else if (category === QUESTIONTYPE.MULTIPLECHOICE) {
        let answers;
        for (const a of req_question.right_answer) {
          answers = ` ${answers ? answers + " , " : ""} ${a} `;
        }

        question.createMultipleChoice({
          _id: uuid.v4(),
          right_answer: answers,
        });
      } else if (category === QUESTIONTYPE.ORDERING) {
        let right_order;

        for (const a of req_question.right_answer) {
          right_order = ` ${right_order ? right_order + "then" : ""} ${a} `;
        }

        question.createOrdering({
          _id: uuid.v4(),
          right_order: right_order,
          order_length: req_question.right_answer.length,
        });
      } else if (category === QUESTIONTYPE.TRUEORFALSE) {
        question.createTrueorfalse({
          _id: uuid.v4(),
          right_answer: req_question.right_answer,
        });
        continue;
      } else if (category === QUESTIONTYPE.FILLINTHEBLANK) {
        question.createFillInTheBlank({
          _id: uuid.v4(),
          right_answer: req_question.right_answer,
        });
        continue;
      }

      for (const req_answers of req_question.answers) {
        question.createOption({
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

module.exports = createQuiz;
