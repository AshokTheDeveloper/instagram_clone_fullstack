const User = require("../../models/user.model");

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const { id } = req.user;
    console.log("profilePic: ", profilePic);
    console.log("User id: ", id);

    const updatedProfilePic = profilePic === null ? null : profilePic;

    const user = await User.findByIdAndUpdate(
      id,
      { profilePic: updatedProfilePic },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(201)
      .json({ message: "Profile picture updated successfully", user });
  } catch (error) {
    console.error("Internal server error: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateProfile;
