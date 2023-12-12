const Sequelize = require("sequelize");

const sequelize = require("../../util/db");

const scoure = sequelize.define(
  "scoure",
  {
    _id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    quiz_title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    result: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = scoure;
