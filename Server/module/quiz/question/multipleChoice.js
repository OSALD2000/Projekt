const Sequelize = require("sequelize");

const sequelize = require("../../../util/db");
const Question = require("./question");

const MultipleChoice = sequelize.define(
  "multipleChoice",
  {
    _id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },

    right_answer: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
  { timestamps: false },
);

Question.hasOne(MultipleChoice, { constraints: true, onDelete: "CASCADE" });
MultipleChoice.belongsTo(Question);

module.exports = MultipleChoice;
