const { body } = require("express-validator");
const QUESTIONTYPE = require("../../module/enum/QUESTIONTYPE");

const Quiz = require("../../module/quiz/quiz");
const Question = require("../../module/quiz/question/question");

let quizId;
let loaded_quiz;

const answer_validation = {
  quizId: {
    in: ["body"],
    isString: true,
    custom: {
      options: async (_Id) => {
        if (!_Id) {
          throw new Error("keine QuizId in body");
        } else {
          quizId = _Id;
          const quiz = await Quiz.findByPk(_Id);
          if (!quiz) {
            throw new Error("keine Quiz unter dieses Quiz Id");
          } else {
            loaded_quiz = quiz;
          }
        }
        return true;
      },
    },
  },

  questions: {
    in: ["body"],
    isArray: true,
    custom: {
      options: async (questions) => {
        const errors = [];

        if (!body("quizId")) {
          throw new Error("keine QuizId in body");
        } else {
          const loaded_questions = await loaded_quiz.getQuestions();

          if (loaded_questions.length !== questions.length) {
            throw new Error("plase answer all qeustion first !");
          } else {
            for (const question of questions) {
              const loaded_question = await Question.findOne({
                where: {
                  _id: question.questionId,
                  quizId: quizId,
                },
              });

              if (!loaded_question) {
                errors.push({
                  message: "question with not found",
                  question: question,
                });
              } else {
                if (
                  question.category.toUpperCase() ===
                  QUESTIONTYPE.MULTIPLECHOICE
                ) {
                  if (!Array.isArray(question.answer)) {
                    errors.push({
                      message:
                        "MULTIPLECHOICE question  should have answer as Array",
                      question: question,
                    });
                  }
                }
                if (
                  question.category.toUpperCase() === QUESTIONTYPE.TRUEORFALSE
                ) {
                  if (typeof question.answer !== "boolean") {
                    errors.push({
                      message:
                        "TRUEORFALSE question with  should have boolean as answer",
                      question: question,
                    });
                  }
                }
              }
            }
          }
        }

        if (errors.length > 0) {
          throw new Error(JSON.stringify(errors));
        }

        return true;
      },
    },
  },
};

module.exports = answer_validation;
