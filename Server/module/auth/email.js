const Sequelize = require("sequelize");

const sequelize = require("../../util/db");

const email = sequelize.define(
  "email",
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    verifieCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      afterCreate: (record) => {
        setTimeout(() => {
          record.destroy().catch((err) => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            throw err;
          });
        },600000);
      },
    },
  },
);

module.exports = email;
