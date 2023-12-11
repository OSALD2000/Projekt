const User = require("../module/auth/user");

const Quiz = require("../module/quiz/quiz");
const Option = require("../module/quiz/question/option");
const Participant = require("../module/quiz/participant");

const Answer = require("../module/chart/answer");
const Statistics = require("../module/chart/statistics");
const Scoure = require("../module/chart/scoure");

const Question = require("../module/quiz/question/question");
const Choiceone = require("../module/quiz/question/choiceone");
const FillInTheBlank = require("../module/quiz/question/fillInTheBlank");
const MultipleChoice = require("../module/quiz/question/multipleChoice");
const TrueOrFalse = require("../module/quiz/question/trueOrFalse");

const create_relation = () => {
  User.hasMany(Quiz, {
    foreignKey: "creator",
    constraints: true,
    onDelete: "CASCADE",
  });

  Quiz.belongsTo(User, { foreignKey: "creator" });

  User.hasMany(Participant);
  Participant.belongsTo(User);

  Quiz.hasMany(Participant, { constraints: true, onDelete: "CASCADE" });

  Participant.hasMany(Answer, { constraints: true, onDelete: "CASCADE" });
  Answer.belongsTo(Participant);

  Quiz.hasMany(Question, { constraints: true, onDelete: "CASCADE" });
  Question.belongsTo(Quiz);

  Question.hasMany(Answer, { constraints: true, onDelete: "CASCADE" });
  Answer.belongsTo(Question, { constraints: true, onDelete: "CASCADE" });

  Question.hasMany(Option, { constraints: true, onDelete: "CASCADE" });

  Quiz.hasOne(Statistics, { constraints: true, onDelete: "CASCADE" });
  Statistics.belongsTo(Quiz);

  User.hasMany(Scoure,  { constraints: true, onDelete: "CASCADE" });
  Quiz.hasMany(Scoure,  { constraints: true, onDelete: "CASCADE" });
  Scoure.belongsTo(Quiz);
};

module.exports = create_relation;
