const Comment = require("../../models/comment.model");

const commentPost = async (req, res) => {
  const { id } = req.user;
  const { postId, content } = req.body;

  try {
    const comment = new Comment({
      content: content,
      userId: id,
      postId: postId,
    });

    await comment.save();

    return res.status(201).json({ message: "Comment created" });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = commentPost;
