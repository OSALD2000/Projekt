const createQuiz = require('./createQuiz');
const getQuiz = require('./getQuiz');
const deleteQuiz = require('./deleteQuiz');
const answerQuiz = require('./answerQuiz');

exports.getPrivateQuiz = getQuiz;

exports.createQuiz = createQuiz;

exports.answerQuiz = answerQuiz;

exports.updateQuiz = (req, res, next) => {};

exports.deleteQuiz = deleteQuiz;
