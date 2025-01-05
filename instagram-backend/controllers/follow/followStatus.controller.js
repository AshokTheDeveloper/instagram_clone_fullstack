const Follow = require("../../models/follow.model");
const mongoose = require("mongoose");

const followStatus = async (req, res) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid or missing userId" });
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid or missing user id" });
    }

    const followingId = new mongoose.Types.ObjectId(userId);
    const followerId = new mongoose.Types.ObjectId(id);

    const isFollowed = await Follow.exists({
      followerId,
      followingId,
    });

    return res.status(200).json({ isFollowed: !!isFollowed });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = followStatus;
