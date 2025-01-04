const Follow = require("../../models/follow.model");
const followStatus = async (req, res) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;

    const isFollowed = await Follow.exists({
      followerId: id,
      followingId: userId,
    });

    return res.status(200).json({ isFollowed: !!isFollowed });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = followStatus;
