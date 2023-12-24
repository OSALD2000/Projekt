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
const create_1000_user = require('./tester_util/create_5000_user');

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

(async () => {
  try {
    await sequelize.sync({ force: true });

    await create_1000_user(User);
    const hashedPw = await bcrypt.hash("admin", 12);
      User.create({
        _id: "1234",
        email: "admin@admin.de",
        password: hashedPw,
        username: "osama",
        emailverified: true,
        roll: 'admin'
    });

    app.listen(8080);
  } catch (error) {
    console.error(error);
  }
})();

