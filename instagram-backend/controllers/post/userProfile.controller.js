const User = require("../../models/user.model");
const mongoose = require("mongoose");

const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const dbUser = await User.findOne({ username });
    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { id } = dbUser;

    const userProfile = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "userId",
          as: "posts",
        },
      },
      {
        $project: {
          username: 1,
          id: 1,
          fullname: 1,
          profilePic: 1,
          followingCount: { $size: "$following" },
          followersCount: { $size: "$followers" },
          postsCount: { $size: "$posts" },
        },
      },
    ]);

    return res.status(200).json({ userProfile: userProfile[0] });
  } catch (error) {
    console.log("Internal server error: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getUserProfile;
