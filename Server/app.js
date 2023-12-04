const express = require("express");

require("dotenv").config();

const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const loeaderRoutes = require("./routes/loaders");
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const userRoutes = require("./routes/user");

const sequelize = require("./util/db");
const createRelation = require("./util/db_relation");

const User = require("./module/auth/user");

createRelation();

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

app.use("/loader", loeaderRoutes);

app.use("/auth", authRoutes);

app.use("/quiz", quizRoutes);

app.use("/user", userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  res
    .status(error.statusCode)
    .json({ message: error.message, error: error.data });
});

sequelize
  .sync({force : true})
  .then(() => {
    return bcrypt.hash("root", 12);
  })
  .then((hashedPw) => {
    return User.create({
      _id: "1213123124",
      email: "test@test.de",
      password: hashedPw,
      username: "TESTES",
      emailverified: true,
    });
  })
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
