const uuid = require("uuid");

module.exports = class Quiz {
  constructor(quizName, ersteller, fragen) {
    this.quizName = quizName;
    this.ersteller = ersteller;
    this.fragen = fragen;
    this.id = uuid.v1();
  }
};
