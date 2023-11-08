const Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "root", "Osama", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
