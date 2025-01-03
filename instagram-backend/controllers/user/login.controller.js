const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

const generateToken = require("../../generateToken/generateToken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Required all the fields" });
    }

    const dbUser = await User.findOne({ email });
    if (dbUser) {
      const isPasswordMatch = await bcrypt.compare(password, dbUser.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      generateToken(dbUser._id, res);
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Internal server error: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = login;
