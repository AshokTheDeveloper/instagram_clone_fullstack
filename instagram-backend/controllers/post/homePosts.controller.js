const Post = require("../../models/post.model");
const Follow = require("../../models/follow.model");

const getHomePosts = async (req, res) => {
  try {
    const { id } = req.user;

    const following = await Follow.find({ followerId: id }).select(
      "followingId"
    );

    const followingIds = following.map((f) => f.followingId);
    const posts = await Post.aggregate([
      { $match: { userId: { $in: followingIds } } },

      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user_details",
        },
      },

      { $unwind: "$user_details" },

      {
        $project: {
          postId: "$_id",
          userId: "$user_details._id",
          fullname: "$user_details.fullname",
          username: "$user_details.username",
          profilePic: "$user_details.profilePic",
          imageUrl: "$imageUrl",
          caption: "$caption",
          createdAt: "$createdAt",
        },
      },
    ]);

    const postsCount = posts.length;
    return res.status(200).json({ posts, postsCount, success: true });
    
  } catch (error) {
    console.log("Internal server error: ", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = getHomePosts;
