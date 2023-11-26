const uuid = require("uuid");

const requestErrorHandler = require("../../util/validation/requestValidation");
const calculat_score = require("../../util/quiz/calculat_score");
const User = require("../../module/auth/user");
const Quiz = require("../../module/quiz/quiz");
const QUESTIONTYPE = require("../../module/enum/QUESTIONTYPE");

const answerQuiz = async (req, res, next) => {
  try {
    requestErrorHandler(req);

    const userId = req.userId;
    const quizId = req.body.quizId;
    const questions = req.body.questions;
    const participant_answers = [];
    const user = await User.findByPk(userId);
    const quiz = await Quiz.findByPk(quizId);

    for (const question of questions) {
      const category = QUESTIONTYPE.getType(question.category.toUpperCase());
      const louded_question = await quiz
        .getQuestions({
          where: {
            _id: question.questionId,
          },
        })
        .then((questions) => {
          return questions[0];
        });

      if (category === QUESTIONTYPE.CHOICEONE) {
        let is_right = true;

        const choiceone = await louded_question.getChoiceone();

        if (question.answer !== choiceone.getDataValue("right_answer")) {
          is_right = false;
        }

        participant_answers.push({
          weight: louded_question.getDataValue("weight"),
          answer: question.answer,
          is_right: is_right,
          category: QUESTIONTYPE.CHOICEONE,
          questionId: louded_question.getDataValue("_id"),
        });
      } else if (category === QUESTIONTYPE.MULTIPLECHOICE) {
        let is_right = true;
        let answers = question.answer.split(",");

        const multiplechoice = await louded_question.getMultipleChoice();
        const choices = multiplechoice.getDataValue("right_answer").split(",");

        for (const check of choices) {
          if (
            !answers.some(
              (a) => a.toLowerCase().trim() === check.toLowerCase().trim(),
            )
          ) {
            is_right = false;
            break;
          }
        }

        participant_answers.push({
          weight: louded_question.getDataValue("weight"),
          answer: question.answer,
          is_right: is_right,
          category: QUESTIONTYPE.MULTIPLECHOICE,
          questionId: louded_question.getDataValue("_id"),
        });
      } else if (category === QUESTIONTYPE.ORDERING) {
        let is_right = true;

        let answers = question.answer.split("then");

        const ordering = await louded_question.getOrdering();

        let right_order = ordering.getDataValue("right_order").split("then");

        for (let i = 0; i < ordering.getDataValue("order_length"); i++) {
          if (
            right_order[i].toLowerCase().trim().trim() !==
            answers[i].toLowerCase().trim().trim()
          ) {
            is_right = false;
            break;
          }
        }

        participant_answers.push({
          weight: louded_question.getDataValue("weight"),
          answer: question.answer,
          is_right: is_right,
          category: QUESTIONTYPE.ORDERING,
          questionId: louded_question.getDataValue("_id"),
        });
      } else if (category === QUESTIONTYPE.TRUEORFALSE) {
        let is_right = true;
        let answer = question.answer;

        const trueorfalse = await louded_question.getTrueorfalse();

        if (answer !== trueorfalse.getDataValue("right_answer")) {
          is_right = false;
        }

        participant_answers.push({
          weight: louded_question.getDataValue("weight"),
          answer: question.answer,
          is_right: is_right,
          category: QUESTIONTYPE.TRUEORFALSE,
          questionId: louded_question.getDataValue("_id"),
        });
      } else if (category === QUESTIONTYPE.FILLINTHEBLANK) {
        let is_right = true;
        let answer = question.answer;

        const fillInTheBlank = await louded_question.getFillInTheBlank();

        if (answer !== fillInTheBlank.getDataValue("right_answer")) {
          is_right = false;
        }

        participant_answers.push({
          weight: louded_question.getDataValue("weight"),
          answer: question.answer,
          is_right: is_right,
          category: QUESTIONTYPE.FILLINTHEBLANK,
          questionId: louded_question.getDataValue("_id"),
        });
      }
    }

    const { score, bestanden } = calculat_score(participant_answers);

    const participant = await user.createParticipant({
      _id: uuid.v4(),
      result: score,
      passed: bestanden,
      quizId: quizId,
    });

    for (const participant_answer of participant_answers) {
      await participant.createAnswer({
        _id: uuid.v4(),
        is_right: participant_answer.is_right,
        answer: participant_answer.answer,
        questionId: participant_answer.questionId,
      });
    }
    
    user.createScoure({
      _id: uuid.v4(),
      result: score,
      quizId: quizId,
    });

    res.status(200).json({
      message: "teilnahme ist angeliegt!",
      scoure: score,
      bestanden: bestanden,
    });

    /**
     * TODO:
     *        - update statistcs
     */
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = answerQuiz;
