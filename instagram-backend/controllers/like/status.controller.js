const Like = require("../../models/like.model");

const likeStatus = async (req, res) => {
  const { id } = req.user;
  const { postId } = req.params;

  try {
    const isLiked = await Like.exists({ userId: id, postId: postId });

    return res.status(200).json({ isLiked: !!isLiked });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = likeStatus;
