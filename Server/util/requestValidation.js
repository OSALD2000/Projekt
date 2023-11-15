const { validationResult } = require("express-validator");

const requestErrorHandler = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 442;
    error.data = errors.array();
    throw error;
  }
};

module.exports = requestErrorHandler;
