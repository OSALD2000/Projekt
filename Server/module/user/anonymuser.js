const {
  uniqueNamesGenerator,
  adjectives,
  animals,
} = require("unique-names-generator");

module.exports = class Anonymuser {
  constructor(nickName) {
    this.nickName =
      nickName ||
      uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        length: 2,
      });
  }
};
