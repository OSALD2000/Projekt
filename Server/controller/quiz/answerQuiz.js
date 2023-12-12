const uuid = require("uuid");

const requestErrorHandler = require("../../util/validation/requestValidation");
const calculat_score = require("../../util/quiz/calculat_score");
const User = require("../../module/auth/user");
const Quiz = require("../../module/quiz/quiz");
const Participant = require("../../module/quiz/participant");

const QUESTIONTYPE = require("../../module/enum/QUESTIONTYPE");
const ubdate_statistic = require("../../util/statistics/ubdate_statistic");

const answerQuiz = async (req, res, next) => {
  let participant;

  try {
    requestErrorHandler(req);

    const userId = req.userId;
    const quizId = req.body.quizId;
    const questions = req.body.questions;
    const participant_answers = [];
    const user = await User.findByPk(userId);
    const quiz = await Quiz.findByPk(quizId);

    const is_participant = await quiz.getParticipants({
      where: {
        userId: userId,
      },
    });

    if (is_participant.length !== 0) {
      res.status(403).json({
        message: "sie sind schon Teilnehmer dieser Quiz",
        quizId: quizId,
      });
    }

    if (userId === quiz.getDataValue("creator")) {
      res.status(403).json({
        message: "creator darf an seiner erstellter Quiz nicht Teilnehemn",
        quizId: quizId,
      });
    }

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
        let answers = question.answer;

        const multiplechoice = await louded_question.getMultipleChoice();
        const choices = multiplechoice
          .getDataValue("right_answer")
          .split(",")
          .filter((t) => t);

        for (const check of choices) {
          if (
            !answers.some(
              (a) =>
                a.value.toLowerCase().trim() === check.trim().toLowerCase(),
            )
          ) {
            is_right = false;
            break;
          }
        }

        const edit_answer = answers.map((a) => a.value).join(",");

        participant_answers.push({
          weight: louded_question.getDataValue("weight"),
          answer: edit_answer,
          is_right: is_right,
          category: QUESTIONTYPE.MULTIPLECHOICE,
          questionId: louded_question.getDataValue("_id"),
        });
      } else if (category === QUESTIONTYPE.TRUEORFALSE) {
        let is_right = true;
        let answer = question.answer;

        const trueorfalse = await louded_question.getTrueorfalse();
        const right_answer =
          trueorfalse.getDataValue("right_answer").toLowerCase() === "true"
            ? true
            : false;

        if (answer !== right_answer) {
          is_right = false;
        }

        participant_answers.push({
          weight: louded_question.getDataValue("weight"),
          answer: question.answer ? "true" : "false",
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

    const { score, bestanden } = calculat_score(
      participant_answers,
      quiz.getDataValue("required_points"),
    );

    participant = await user.createParticipant({
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
      quiz_title: quiz.getDataValue("title"),
      quizId: quizId,
    });

    ubdate_statistic(quiz, participant);

    res.status(200).json({
      message: "teilnahme ist angeliegt!",
      quizId: quizId,
      participantId: participant.getDataValue("_id"),
    });
  } catch (error) {
    console.log(error);

    participant
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
};

module.exports = answerQuiz;
