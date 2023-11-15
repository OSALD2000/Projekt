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

    answer_one: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    answer_two: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    answer_three: {
      type: Sequelize.STRING,
    },
    answer_four: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: false },
);

Question.hasOne(MultipleChoice, { constraints: true, onDelete: "CASCADE" });
MultipleChoice.belongsTo(Question);

module.exports = MultipleChoice;
