const sequelize = require("./util/db");
const create_users = require("./tester_util/create_users");
const User = require("./module/auth/user");
const bcrypt = require("bcryptjs");
const app = require("./app");

sequelize
  .sync({ force: true })
  .then(() => {
    create_users(User, 50);
  })
  .then(() => {
    return bcrypt.hash("admin", 12);
  })
  .then((hashedPw) => {
    return User.create({
      _id: "1234",
      email: "admin@admin.de",
      password: hashedPw,
      username: "osama",
      emailverified: true,
      roll: "admin",
    });
  })
  .then(() => {
    app.listen(8888);
  })
  .catch((err) => console.error(err));
