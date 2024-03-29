const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MailHOST,
  port: process.env.MailPORT,
  auth: {
    user: process.env.MailUSER,
    pass: process.env.MailKey,
  },
});

exports.sendeVerifcationEmail = async (email) => {
  const emailHtml = `<head> <title>Bestätigungscode per E-Mail</title><style> body \{font-family: Arial, sans-serif;text-align: center;background-color: #f0f0f0;\}h1 \{ color: #333;\}p\{font-size: 18px;color: #666;\}.confirmation-code \{font-size: 24px;color: #007BFF;\}</style></head><body><h1>Willkommen zur E-Mail-Bestätigung</h1><p>Ihr Bestätigungscode:</p><p class="confirmation-code">${email.dataValues.verifieCode}</p></body>`;
  try {
    return transporter.sendMail({
      from: " Brain Check <braincheck2023@gmail.com>",
      to: `${email.dataValues.email}`,
      subject: "Email Verification",
      html: emailHtml,
    });
  } catch (err) {
    throw err;
  }
};

exports.sendeEmailfromAdminToUser = async (email, subject, content) => {
  const emailHtml = `
  <head><title>${subject}</title><style> body \{font-family: Arial, sans-serif;text-align: center;background-color: #f0f0f0;\}h1 \{ color: #333;\}p\{font-size: 18px;color: #666;\}.confirmation-code \{font-size: 24px;color: #007BFF;\}</style></head>
  <body>
  ${content}
  </body>`;

  try {
    return transporter.sendMail({
      from: " Brain Check <braincheck2023@gmail.com>",
      to: `${email}`,
      subject: subject,
      html: emailHtml,
    });
  } catch (err) {
    throw err;
  }
};
