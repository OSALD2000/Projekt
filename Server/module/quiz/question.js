const Sequelize = require("sequelize");

const sequelize = require("../../util/db");

const question = sequelize.define("question", {
  _id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  weight: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = question;
