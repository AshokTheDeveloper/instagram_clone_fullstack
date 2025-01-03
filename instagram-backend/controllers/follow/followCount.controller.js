const User = require("../../models/user.model");
const Follow = require("../../models/follow.model");
const Post = require("../../models/post.model");

const getFollowCount = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id).select("_id username profilePic");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followingCount = await Follow.countDocuments({ followerId: id });

    const followersCount = await Follow.countDocuments({ followingId: id });

    const postsCount = await Post.countDocuments({ userId: id });

    return res.status(200).json({
      followCount: {
        username: user.username,
        fullname: user.fullname,
        profilePic: user.profilePic,
        followingCount: followingCount,
        followersCount: followersCount,
        postsCount: postsCount,
      },
    });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getFollowCount;
