const Sequelize = require("sequelize");

const sequelize = require("../../util/db");

const participant = sequelize.define(
  "participant",
  {
    _id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    result: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    passed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = participant;
