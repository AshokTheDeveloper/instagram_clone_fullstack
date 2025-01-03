const Story = require("../../models/story.model");
const mongoose = require("mongoose");

const getHomeStories = async (req, res) => {
  try {
    const { id } = req.user;
    const idOfUser = new mongoose.Types.ObjectId(id);

    // Fetch distinct users with stories
    const stories = await Story.aggregate([
      {
        $match: {
          userId: { $ne: idOfUser },
        },
      },
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
        $group: {
          _id: "$userId",
          profilePic: { $first: "$userDetails.profilePic" },
          username: { $first: "$userDetails.username" },
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

    if (!stories || stories.length === 0) {
      return res.status(404).json({ message: "Stories not found" });
    }

    return res.status(200).json({ stories: stories });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getHomeStories;
