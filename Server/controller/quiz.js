const uuid = require("uuid");

const requestErrorHandler = require("../util/requestValidation");
const create_quesion = require("../util/create_quesion/create_quesion");

const VISIBILITY = require("../module/enum/VISIBILITY");
const QUESTIONTYPE = require("../module/enum/QUESTIONTYPE");

const User = require("../module/auth/user");

exports.getQuiz = (req, res, next) => {};

exports.createQuiz = (req, res, next) => {

//   requestErrorHandler(req);

//   const userId = req.userId;
//   const questions = req.body.questions;
//   const question_number = questions.length;
//   const category = req.body.category;
//   const win_percent = req.body.win_percent;
//   const visibility =
//     req.body.visibility.toUpperCase() === VISIBILITY.PRIVATE
//       ? VISIBILITY.PRIVATE
//       : VISIBILITY.PUBLIC;
//   let quizId;

};

exports.answerQuiz = (req, res, next) => {};

exports.deleteQuiz = (req, res, next) => {};
