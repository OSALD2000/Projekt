const Sequelize = require("sequelize");

const sequelize = require("../../util/db");

const participant = sequelize.define(
  "participant",
  {
    result: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    passed: {
      type: Sequelize.ENUM("JA", "NEIN"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = participant;
