const Sequelize = require("sequelize");

const sequelize = require("../../util/db");

const quiz = sequelize.define("quiz", {
  _id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  beschreibung: {
    type: Sequelize.TEXT,
  },

  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  question_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  required_points: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  
  visibility: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = quiz;
