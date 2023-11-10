const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const mail = require("../util/mail");

const User = require("../module/auth/user");
const Email = require("../module/auth/email");

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
  let createdUser;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      return User.create({
        _id: uuid.v4(),
        username: username,
        email: email,
        password: hashedPw,
        emailverified: false,
      });
    })
    .then((result) => {
      createdUser = result;
      const verifieCode = crypto.randomInt(10000, 99999);
      return Email.create({
        email: createdUser.dataValues.email,
        verifieCode: verifieCode,
      });
    })
    .then((email) => {
      const emailHtml = `<head> <title>Bestätigungscode per E-Mail</title><style> body \{font-family: Arial, sans-serif;text-align: center;background-color: #f0f0f0;\}h1 \{ color: #333;\}p\{font-size: 18px;color: #666;\}.confirmation-code \{font-size: 24px;color: #007BFF;\}</style></head><body><h1>Willkommen zur E-Mail-Bestätigung</h1><p>Ihr Bestätigungscode:</p><p class="confirmation-code">${email.dataValues.verifieCode}</p></body>`;
      return mail.sendMail({
        from: " Brain Check <braincheck2023@gmail.com>",
        to: `${email.dataValues.email}`,
        subject: "Email Verification",
        html: emailHtml,
      });
    })
    .then(() => {
      res.json({ message: "User created", userId: createdUser.dataValues._id });
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
      const token = jwt.sign(
        {
          email: loadedUser.dataValues.email,
          _id: loadedUser.dataValues._id,
        },
        process.env.API_KEY,
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

exports.emailverification = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 442;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const verificationCode = req.body.verificationCode;
  let loadedUser;

  Email.findOne({
    where: {
      email: email,
    },
  })
    .then((email) => {
      if (!email) {
        const error = new Error("verification Code ist abgelaufen");
        error.statusCode = 410;
        throw error;
      }

      if (verificationCode !== email.dataValues.verifieCode) {
        const error = new Error("verification Code ist nicht richtig");
        error.statusCode = 442;
        throw error;
      }

      return User.findOne({ where: { email: email.dataValues.email } });
    })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found");
        error.statusCode = 401;
        throw error;
      }
      user.dataValues.emailverified = true;
      loadedUser = user;
      return user.save();
    })
    .then(() => {
      const token = jwt.sign(
        {
          email: loadedUser.dataValues.email,
          _id: loadedUser.dataValues._id,
        },
        process.env.API_KEY,
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
