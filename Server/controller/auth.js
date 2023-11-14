const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const mail = require("../util/mail");
const requestErrorHandler = require("../util/requestValidation");

const User = require("../module/auth/user");
const Email = require("../module/auth/email");

exports.signup = (req, res, next) => {
  
  requestErrorHandler(req);

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
        emailverified: false,
      });
    })
    .then((createdUser) => {
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

      if (!user.dataValues.emailverified) {
        const error = new Error("Bitte bestaetigen Sie Ihre Email Addresse");
        error.statusCode = 423;
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

exports.postEmailverification = (req, res, next) => {

  requestErrorHandler(req);
  
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
      user.emailverified = true;
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

exports.getEmailverification = (req, res, next) => {
  const email = req.params.email;
  const verifieCode = crypto.randomInt(10000, 99999);

  Email.findOne({ where: { email: email } })
    .then((email) => {
      if (email) {
        return email.destroy();
      }
    }).then(() => {
      return Email.create({
        email: email,
        verifieCode: verifieCode,
      });
    }).then((email) => {
      return mail.sendeVerifcationEmail(email);
    })
    .then(() => {
      res.status(200).json({ message: "Besteatigunug Email gesendet!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
