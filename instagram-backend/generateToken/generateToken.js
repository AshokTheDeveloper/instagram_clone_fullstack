const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (user, res) => {
  try {
    const payload = {
      id: user,
    };

    const jwtToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
    return res.status(200).json({ jwt_token: jwtToken });
  } catch (error) {
    console.log("Internal server error: ", error.message);
    return res.status(500).json({ message: "Failed to generate token " });
  }
};

module.exports = generateToken;
