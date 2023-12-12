const Sequelize = require("sequelize");

const sequelize = require("../../../util/db");
const Question = require("./question");

const Choiceone = sequelize.define(
  "choiceone",
  {
    _id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    right_answer: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

Question.hasOne(Choiceone, { constraints: true, onDelete: "CASCADE" });
Choiceone.belongsTo(Question);

module.exports = Choiceone;
