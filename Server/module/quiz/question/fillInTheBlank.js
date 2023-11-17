const Sequelize = require("sequelize");

const sequelize = require("../../../util/db");
const Question = require("./question");

const FillInTheBlank = sequelize.define(
  "fillInTheBlank",
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
  { timestamps: false },
);

Question.hasOne(FillInTheBlank, { constraints: true, onDelete: "CASCADE" });
FillInTheBlank.belongsTo(Question);

module.exports = FillInTheBlank;
