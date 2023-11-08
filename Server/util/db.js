const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complite", "root", "Osama", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
