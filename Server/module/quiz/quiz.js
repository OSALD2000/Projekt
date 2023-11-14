const Sequelize = require("sequelize");

const sequelize = require("../../util/db");

const quiz = sequelize.define("quiz", {
  _id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  question_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  win_percent: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  visibility: {
    type: Sequelize.ENUM("PRIVATE", "PUBLIC"),
    allowNull: false,
  },
});

module.exports = quiz;
