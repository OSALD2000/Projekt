const Sequelize = require("sequelize");

const sequelize = require("../../../util/db");
const Question = require("./question");

const Ordering = sequelize.define(
  "ordering",
  {
    _id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },

    right_order: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    order_length: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false },
);

Question.hasOne(Ordering, { constraints: true, onDelete: "CASCADE" });
Ordering.belongsTo(Question);

module.exports = Ordering;
