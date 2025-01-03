const Like = require("../../models/like.model");

const likePost = async (req, res) => {
  const { id } = req.user;
  const { postId } = req.body;

  try {
    const isLikeExist = await Like.findOne({ userId: id, postId: postId });

    if (!isLikeExist) {
      const like = new Like({
        userId: id,
        postId: postId,
      });
      
      await like.save();
      return res.status(201).json({ message: "Post liked" });
    } else {
      await Like.deleteOne({ userId: id, postId: postId });
      return res.status(201).json({ message: "Post unliked" });
    }
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = likePost;
