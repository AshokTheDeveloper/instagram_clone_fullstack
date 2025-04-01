const Story = require("../../models/story.model");
const Follow = require("../../models/follow.model");

const getHomeStories = async (req, res) => {
  try {
    const { id } = req.user;

    const following = await Follow.find({ followerId: id }).select(
      "followingId"
    );
    const followingIds = following.map((f) => f.followingId);

    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const stories = await Story.aggregate([
      {
        $match: {
          userId: { $in: followingIds },
          createdAt: { $gte: twentyFourHoursAgo },
        },
      },

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
        $group: {
          _id: "$userId",
          profilePic: { $first: "$user_details.profilePic" },
          username: { $first: "$user_details.username" },
        },
      },

      {
        $project: {
          userId: "$_id",
          profilePic: 1,
          username: 1,
          _id: 0,
        },
      },
    ]);
    const storiesCount = stories.length;

    return res.status(200).json({ stories, storiesCount, success: true });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = getHomeStories;
