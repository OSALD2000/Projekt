const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let decodedToken;
  try {
    const token = req.get("Authorization");
    decodedToken = jwt.verify(token, process.env.API_KEY);
  } catch (err) {
    err.statusCode = 401;
    err.message = "not authenticated";
    throw err;
  }

  if (!decodedToken || !decodedToken.admin) {
    const error = new Error("not authenticated");
    error.statusCode = 401;
    throw error;
  }

  req.adminId = decodedToken._id;
  next();
};
