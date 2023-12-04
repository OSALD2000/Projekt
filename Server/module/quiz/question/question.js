const Sequelize = require("sequelize");

const sequelize = require("../../../util/db");

const question = sequelize.define(
  "question",
  {
    _id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    question_value: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    weight: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    category: {
      type: Sequelize.ENUM(
        "MULTIPLECHOICE",
        "FILLINTHEBLANK",
        "TRUEORFALSE",
        "CHOICEONE",
      ),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = question;
