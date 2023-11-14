const Sequelize = require("sequelize");

const sequelize = require("../../util/db");

const answer = sequelize.define("answer", {
  _id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  is_right:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
});

module.exports = answer;
