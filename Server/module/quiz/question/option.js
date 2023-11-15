const Sequelize = require("sequelize");

const sequelize = require("../../../util/db");

const option = sequelize.define(
  "option",
  {
    _id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = option;
