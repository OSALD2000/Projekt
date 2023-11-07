const Person = require("./person");

module.exports = class User extends Person {
  constructor(vorname, nachname, email, benutzerName, kennwort) {
    super(vorname, nachname);
    this.email = email;
    this.benutzerName = benutzerName;
    this.kennwort = kennwort;
  }
};
