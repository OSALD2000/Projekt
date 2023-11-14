const Sequelize = require("sequelize");

const sequelize = require("../../util/db");

const option = sequelize.define("option", {
  _id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  is_right_answer:{
    type:Sequelize.ENUM("YES", "NO"),
    allowNull: false,
  }
});

module.exports = option;
