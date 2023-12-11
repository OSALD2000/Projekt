const express = require("express");

require("dotenv").config();

const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const adminRoutes = require("./routes/admin");
const loeaderRoutes = require("./routes/loaders");
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const userRoutes = require("./routes/user");
const statisticRoutes = require("./routes/statistic");

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

app.use("/statistics", statisticRoutes);

app.use("/admin", adminRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  res
    .status(error.statusCode)
    .json({ message: error.message, error: error.data });
});

sequelize
  .sync({ force: false })
  .then(() => {
    return bcrypt.hash("root", 12);
  })
  .then((hashedPw) => {
    //   return User.create({
    //     _id: "1",
    //     email: "test1@test.de",
    //     password: hashedPw,
    //     username: "TEST1",
    //     emailverified: true,
    //     roll: 'admin'
    //   });
    // }).then(() => {
    //   return bcrypt.hash("root", 12);
    // })
    // .then((hashedPw) => {
    //   return User.create({
    //     _id: "2",
    //     email: "test2@test.de",
    //     password: hashedPw,
    //     username: "TEST2",
    //     emailverified: true,
    //   });
    // }).then(() => {
    //   return bcrypt.hash("root", 12);
    // })
    // .then((hashedPw) => {
    //   return User.create({
    //     _id: "3",
    //     email: "test3@test.de",
    //     password: hashedPw,
    //     username: "TEST3",
    //     emailverified: true,
    //   });
    // })
  }).then(() => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
