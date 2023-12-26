const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let decodedToken;
  try {
    const token = req.get("Authorization");
    decodedToken = jwt.verify(token, process.env.API_KEY);

    if (!decodedToken) {
      throw error;
    }
  } catch (err) {
    err.statusCode = 401;
    err.message = "not authenticated";
    throw err;
  }

  req.userId = decodedToken._id;
  next();
};
