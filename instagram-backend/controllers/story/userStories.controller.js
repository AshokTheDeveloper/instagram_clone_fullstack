const Story = require("../../models/story.model");

const getUserStories = async (req, res) => {
  const { username } = req.params;

  try {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const stories = await Story.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $match: {
          "userDetails.username": username,
          createdAt: { $gte: twentyFourHoursAgo },
        },
      },
      {
        $project: {
          storyId: "$_id",
          userId: "$userDetails._id",
          createdAt: 1,
          profilePic: "$userDetails.profilePic",
          username: "$userDetails.username",
          mediaUrl: "$mediaUrl",
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

module.exports = getUserStories;
