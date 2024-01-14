const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.SCHEMA, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: process.env.DB_TYPE,
  host: process.env.DB_HOST,
});

module.exports = sequelize;
