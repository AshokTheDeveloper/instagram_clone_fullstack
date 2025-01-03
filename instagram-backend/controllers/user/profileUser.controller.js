const User = require("../../models/user.model");

const getProfileUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profileUser = {
      id: user._id,
      username: user.username,
      fullname: user.fullname,
      profilePic: user.profilePic,
    };

    return res.status(200).json({ profileUser });
  } catch (error) {
    console.log("Internal Server Error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getProfileUser;
