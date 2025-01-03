const Story = require("../../models/story.model");

const getUserStories = async (req, res) => {
  const { username } = req.params;

  try {
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
        },
      },
      {
        $project: {
          storyId: "$_id", // Use _id of story
          userId: "$userDetails._id", // userId from userDetails
          createdAt: 1, // Pull `createAt` from the story collection
          profilePic: "$userDetails.profilePic", // profilePic from userDetails
          username: "$userDetails.username", // username from userDetails
          mediaUrl: "$mediaUrl", // mediaUrl from story
          _id: 0, // exclude the default _id
        },
      },
    ]);

    if (!stories || stories.length === 0) {
      return res.status(404).json({ message: "Stories not found" });
    }

    return res.status(200).json({ stories });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getUserStories;
