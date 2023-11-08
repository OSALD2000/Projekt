const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 442;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      return User.create({
        _id: uuid.v4(),
        username: username,
        email: email,
        password: hashedPw,
      });
    })
    .then((result) => {
      console.log(result);
      res
        .status(201)
        .json({ message: "User created", userId: result.dataValues._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.dataValues.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Worng password");
        error.statusCode = 401;
        throw error;
      }

      return bcrypt.hash(process.env.API_KEY, 12);
    })
    .then((apiKey) => {
      const token = jwt.sign(
        {
          email: loadedUser.dataValues.email,
          _id: loadedUser.dataValues._id,
        },
        apiKey,
        { expiresIn: "1h" },
      );

      res.status(200).json({ token: token, userId: loadedUser.dataValues._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
