const Like = require("../../models/like.model");

const UnlikePost = async (req, res) => {
  const { id } = req.user;
  const { postId } = req.body;

  try {
    const existingLike = await Like.findOne({ userId: id, postId: postId });

    if (existingLike) {
      await Like.deleteOne({ userId: id, postId: postId });
      return res.status(201).json({ message: "Like removed" });
    } else {
      return res.status(404).json({ message: "Like not found" });
    }
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = UnlikePost;
