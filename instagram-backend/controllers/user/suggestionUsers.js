const User = require("../../models/user.model");

const getSuggestionUsers = async (req, res) => {
  try {
    const { id } = req.user;
    const users = await User.find({ _id: { $ne: id } }).select(
      "_id username profilePic"
    );
    if (users && users.length > 0) {
      return res.status(200).json({ users });
    } else {
      return res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    console.log("Internal server error: ", error);
  }
};

module.exports = getSuggestionUsers;
