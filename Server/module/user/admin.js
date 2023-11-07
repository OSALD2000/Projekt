const Person = require("./person");

module.exports = class Admin extends Person {
  constructor(vorname, nachname, adminLoginName, adminKennwort) {
    super(vorname, nachname);
    this.adminLoginName = adminLoginName;
    this.adminKennwort = adminKennwort;
  }
};
