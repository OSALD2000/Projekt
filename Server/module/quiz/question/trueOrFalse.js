const Sequelize = require("sequelize");

const sequelize = require("../../../util/db");
const Question = require("./question");

const TrueOrFalse = sequelize.define(
  "trueorfalse",
  {
    _id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    right_answer: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  { timestamps: false },
);

Question.hasOne(TrueOrFalse, { constraints: true, onDelete: "CASCADE" });
TrueOrFalse.belongsTo(Question);

module.exports = TrueOrFalse;
