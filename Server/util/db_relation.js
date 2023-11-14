const User = require("../module/auth/user");

const Quiz = require("../module/quiz/quiz");
const Option = require("../module/quiz/option");
const Question = require("../module/quiz/question");
const Participant = require("../module/quiz/participant");

const Answer = require("../module/chart/answer");
const Statistics = require("../module/chart/statistics");
const Scoure = require("../module/chart/scoure");

const create_relation = () => {
  User.hasMany(Quiz, {
    foreignKey: "creator",
    constraints: true,
    onDelete: "CASCADE",
  });
  
  Quiz.belongsTo(User, { foreignKey: "creator" });

  Participant.belongsTo(User);
  Quiz.hasMany(Participant, { constraints: true, onDelete: "CASCADE" });

  Participant.hasOne(Answer, { constraints: true, onDelete: "CASCADE" });
  Answer.belongsTo(Participant);

  Quiz.hasMany(Question, { constraints: true, onDelete: "CASCADE" });
  Question.belongsTo(Quiz);

  Question.hasMany(Answer, { constraints: true, onDelete: "CASCADE" });
  Answer.belongsTo(Participant, { constraints: true, onDelete: "CASCADE" });

  Question.hasMany(Option, { constraints: true, onDelete: "CASCADE" });
  Answer.belongsTo(Option);

  Quiz.hasOne(Statistics, { constraints: true, onDelete: "CASCADE" });
  Statistics.belongsTo(Quiz);

  User.hasMany(Scoure);
  Scoure.belongsTo(Quiz);
};

module.exports = create_relation;
