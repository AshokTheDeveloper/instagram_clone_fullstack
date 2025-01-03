const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ message: "Required all the fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      fullname,
      username,
      email,
      password: hashedPassword,
    };

    const findDbUser = await User.findOne({ email });
    if (findDbUser) {
      return res.status(409).json({ message: "User already exists" });
    } else {

      await User.create(newUser);
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.log("Internal server error: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = signup;
