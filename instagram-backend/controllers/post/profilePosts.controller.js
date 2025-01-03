const Post = require("../../models/post.model");

const profilePost = async (req, res) => {
  try {
    const { id } = req.user;
    const posts = await Post.find({ userId: id }).sort({ createdAt: -1 });
    if (!posts) {
      return res.status(400).json({ message: "No posts found" });
    }
    return res.status(200).json({ posts });
  } catch (error) {
    console.log("Internal Server Error: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = profilePost;
