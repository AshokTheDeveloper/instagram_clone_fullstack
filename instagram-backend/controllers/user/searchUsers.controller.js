const User = require("../../models/user.model");

const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const queryResult = await User.find({
      username: { $regex: query, $options: "i" },
    }).select("username _id profilePic fullname");

    return res.status(200).json({ users: queryResult });
  } catch (error) {
    console.log("Internal server error: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = searchUsers;
