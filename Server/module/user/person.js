const uuid = require("uuid");

module.exports = class Person {
  constructor(vorname, nachname) {
    this.vorname = vorname;
    this.nachname = nachname;
    this.id = uuid.v1();
  }
};
