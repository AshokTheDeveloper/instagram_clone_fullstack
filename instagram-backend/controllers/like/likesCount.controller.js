const Like = require("../../models/like.model");

const likesCount = async (req, res) => {
  const { postId } = req.params;

  try {
    const count = await Like.countDocuments({ postId: postId });
    return res.status(200).json({ likesCount: count });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = likesCount;
