const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    const jwtToken = authHeader.split(" ")[1];
    if (!jwtToken) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    const SECRET_KEY = process.env.SECRET_KEY;
    jwt.verify(jwtToken, SECRET_KEY, (error, payload) => {
      if (error) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      req.user = payload;
      next();
    });
  } catch (error) {
    console.log("Error at middleware: ", error.message);
  }
};

module.exports = authenticateUser;
