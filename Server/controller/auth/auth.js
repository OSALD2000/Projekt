const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const mail = require("../../util/mail");
const requestErrorHandler = require("../../util/validation/requestValidation");

const User = require("../../module/auth/user");
const Email = require("../../module/auth/email");

exports.signup = async (req, res, next) => {
  try {
    requestErrorHandler(req);

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const hashedPw = await bcrypt.hash(password, 12);

    const createdUser = await User.create({
      _id: uuid.v4(),
      username: username,
      email: email,
      password: hashedPw,
      emailverified: false,
    });

    res.json({ message: "User created", userId: createdUser.dataValues._id });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      const error = new Error("A user with this email could not be found");
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.dataValues.password);

    if (!isEqual) {
      const error = new Error("Worng password");
      error.statusCode = 401;
      throw error;
    }

    if (!user.dataValues.emailverified) {
      const error = new Error("Bitte bestaetigen Sie Ihre Email Addresse");
      error.statusCode = 423;
      throw error;
    }

    if (user.getDataValue("roll") === "admin") {
      const token = jwt.sign(
        {
          _id: user.dataValues._id,
          email: user.dataValues.email,
          admin: true,
        },
        process.env.API_KEY,
        { expiresIn: "1h" },
      );

      res
        .status(200)
        .json({ token: token, userId: user.dataValues._id, admin: true });
    } else {
      const token = jwt.sign(
        {
          email: user.dataValues.email,
          _id: user.dataValues._id,
        },
        process.env.API_KEY,
        { expiresIn: "1h" },
      );

      res.status(200).json({ token: token, userId: user.dataValues._id });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
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

exports.getEmailverification = async (req, res, next) => {
  try {
    const req_email = req.params.email;
    const verifieCode = crypto.randomInt(10000, 99999);

    const user = await User.findOne({ where: { email: req_email } });

    if (!user) {
      res
        .status(442)
        .json({ message: "kein User unter dieses Email Addresse" });
    } else {
      const email = await Email.findOne({ where: { email: req_email } });

      if (email) {
        res.status(200).json({ message: "Email wurde erfolgreich gesendet" });
      } else {
        const new_email = await Email.create({
          email: req_email,
          verifieCode: verifieCode,
          try: 1,
        });

        mail.sendeVerifcationEmail(new_email);

        res.status(200).json({ message: "Email ist erfolgreich gesendet" });
      }
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getEmailverificationAgain = async (req, res, next) => {
  try {
    const req_email = req.params.email;
    const verifieCode = crypto.randomInt(10000, 99999);

    const user = await User.findOne({ where: { email: req_email } });

    if (!user) {
      res
        .status(442)
        .json({ message: "kein User unter dieses Email Addresse" });
    } else {
      const email = await Email.findOne({ where: { email: req_email } });
      if (email) {
        if (email.getDataValue("try") > 5) {
          res.status(442).json({
            message:
              "so viele Emails wurden gesendet bitte in kurze nochmal versuchen",
          });
        } else {
          email.verifieCode = verifieCode;
          email.try = email.getDataValue("try") + 1;
          await email.save();
          await mail.sendeVerifcationEmail(email);
          res.status(200).json({ message: "Email ist nochmal gesendet" });
        }
      } else {
        res.status(442).json({ message: "melden sie sich bitte an!" });
      }
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
