const User = require("../../models/user.model");
const Post = require("../../models/post.model");

const userProfilePosts = async (req, res) => {
  try {
    const { username } = req.params;

    const dbUser = await User.findOne({ username });
    if (!dbUser) {
      return res.status(401).json({ message: "User not found" });
    }

    const userPosts = await Post.find({ userId: dbUser._id });
    return res.status(200).json({ posts: userPosts });
  } catch (error) {
    console.log("Internal server error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = userProfilePosts;
