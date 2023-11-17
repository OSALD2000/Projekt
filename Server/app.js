const express = require("express");

require("dotenv").config();

const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const authRoutes = require("./routes/auth");
const is_auth = require("./middleware/is-auth");
const quizRoutes = require("./routes/quiz");

const sequelize = require("./util/db");
const createRelation = require("./util/db_relation");

const User = require("./module/auth/user");
const TrueOrFalse = require("./module/quiz/question/trueOrFalse");

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

app.use("/auth", authRoutes);

app.use(is_auth);

app.use("/quiz", quizRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  res
    .status(error.statusCode)
    .json({ message: error.message, error: error.data });
});

sequelize
  .sync()
  .then(() => {
    return bcrypt.hash("root", 12);
  })
  .then((hashedPw) => {
    // return User.create({
    //   _id: "1213123124",
    //   email: "test@test.de",
    //   password: hashedPw,
    //   username: "TESTES",
    //   emailverified: true,
    // });
  })
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
