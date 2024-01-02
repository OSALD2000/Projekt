const uuid = require("uuid");

const requestErrorHandler = require("../../util/validation/requestValidation");

const VISIBILITY = require("../../module/enum/VISIBILITY");
const QUESTIONTYPE = require("../../module/enum/QUESTIONTYPE");

const User = require("../../module/auth/user");
const create_chart_bar_obj = require("../../util/statistics/create_chart_bar_obj");
const create_chart_doughnut_obj = require("../../util/statistics/create_chart_doughnut_obj");

const createQuiz = async (req, res, next) => {
  let quiz;
  try {
    requestErrorHandler(req);

    const userId = req.userId;
    const questions = req.body.questions;
    const question_number = questions.length;
    const quizCategory = req.body.quizCategory;
    const required_points = req.body.required_points;
    const title = req.body.title;
    const beschreibung = req.body.beschreibung || "keine Beschreibung";
    const questionIds = [];
    const quizId = uuid.v4();
    const visibility =
      req.body.visibility.toUpperCase() === VISIBILITY.PRIVATE ? false : true;

    const user = await User.findByPk(userId);

    quiz = await user.createQuiz({
      _id: quizId,
      title: title,
      beschreibung: beschreibung,
      category: quizCategory,
      question_number: question_number,
      required_points: required_points,
      visibility: visibility,
    });

    for (const req_question of questions) {
      const category = QUESTIONTYPE.getType(
        req_question.category.toUpperCase(),
      );

      let id = uuid.v4();
      questionIds.push(id);

      const question = await quiz.createQuestion({
        _id: id,
        question_value: req_question.question_value,
        weight: parseInt(req_question.weight),
        category: category,
      });

      if (category === QUESTIONTYPE.CHOICEONE) {
        await question.createChoiceone({
          _id: uuid.v4(),
          right_answer: req_question.right_answer.value,
        });
      }

      //TODO: check if answers length <= optionslength
      else if (category === QUESTIONTYPE.MULTIPLECHOICE) {
        let answers;
        for (const a of req_question.right_answer) {
          answers = ` ${answers ? answers + " , " : ""} ${a.value} `;
        }

        await question.createMultipleChoice({
          _id: uuid.v4(),
          right_answer: answers,
        });
      } else if (category === QUESTIONTYPE.TRUEORFALSE) {
        await question.createTrueorfalse({
          _id: uuid.v4(),
          right_answer: req_question.right_answer ? "true" : "false",
        });
        continue;
      } else if (category === QUESTIONTYPE.FILLINTHEBLANK) {
        await question.createFillInTheBlank({
          _id: uuid.v4(),
          right_answer: req_question.right_answer,
        });
        continue;
      }

      for (const req_answers of req_question.answers) {
        await question.createOption({
          _id: uuid.v4(),
          value: req_answers.value,
        });
      }
    }

    const chart_bar_obj = create_chart_bar_obj(question_number, questionIds.sort((a, b)=> a.localeCompare(b)));
    const chart_doughnut_obj = create_chart_doughnut_obj();

    await quiz.createStatistic({
      _id: uuid.v4(),
      participants: 0,
      success_Participants: 0,
      failed_Participants: 0,
      average_scoure: 0.0,
      chart_bar_data: JSON.stringify(chart_bar_obj),
      chart_doughnut_data: JSON.stringify(chart_doughnut_obj),
    });

    res
      .status(201)
      .json({ message: "Quiz created successfully", quizId: quizId });
  } catch (error) {
    console.log(error);
    if (error.statusCode !== 442) {
      quiz
        .destroy()
        .then(() => {
          if (!error.statusCode) {
            error.statusCode = 500;
            error.message = "Internal Server Error";
          }
          res
            .status(error.statusCode)
            .json({ error: error.message, data: error.data });
        })
        .catch((err) => {
          err.statusCode = 500;
          err.message = "Internal Server Error";
          res
            .status(error.statusCode)
            .json({ error: error.message, data: error.data });
        });
    }
    next(error);
  }
};

module.exports = createQuiz;
