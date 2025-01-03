const Follow = require("../../models/follow.model");

const followUser = async (req, res) => {
  const { userId } = req.body;
  const { id } = req.user;

  try {
    // Check if the follow relationship already exists
    const existingFollow = await Follow.findOne({
      followerId: id,
      followingId: userId,
    });

    if (existingFollow) {
      await Follow.deleteOne({ followerId: id, followingId: userId });
      return res.status(200).json({ message: "User Un followed successfully" });
    }

    // Create a new follow relationship
    const follow = new Follow({
      followerId: id,
      followingId: userId,
    });

    await follow.save();

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    console.error("Error following user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = followUser;
