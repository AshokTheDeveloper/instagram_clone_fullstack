const User = require("../../models/user.model");

const profileUpload = async (req, res) => {
  try {
    const { id } = req.user;
    const { profilePic } = req.body;

    if (!profilePic) {
      return res.status(400).json({ message: "Please provide an image" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.profilePic = profilePic === "null" ? null : profilePic;
    await user.save();

    return res
      .status(201)
      .json({ message: "Profile image uploaded successfully" });
  } catch (error) {
    console.log("Internal Server Error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = profileUpload;
