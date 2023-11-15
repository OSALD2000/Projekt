const Sequelize = require("sequelize");

const sequelize = require("../../util/db");

const statistics = sequelize.define(
  "statistics",
  {
    _id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },

    participants: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    success_Participants: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    failed_Participants: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    average: {
      type: Sequelize.DOUBLE,
    },
    visibility: {
      type: Sequelize.ENUM("private", "public"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = statistics;
