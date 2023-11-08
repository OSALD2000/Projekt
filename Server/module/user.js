const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const user = sequelize.define("user", {
  _id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = user;
