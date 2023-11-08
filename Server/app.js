const express = require("express");

require("dotenv").config();

const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");

const sequelize = require("./util/db");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

sequelize
  .sync({force : true})
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
