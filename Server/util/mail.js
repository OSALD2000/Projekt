const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth:{
    user:"braincheck2023@gmail.com",
    pass: process.env.MailKey,
  }
});

module.exports = transporter;