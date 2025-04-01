const mongoose = require("mongoose");
const Comment = require("../../models/comment.model");

const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid postId" });
    }

    const comments = await Comment.aggregate([
      {
        $match: { postId: new mongoose.Types.ObjectId(postId) },
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
        $project: {
          content: 1,
          createdAt: 1,
          updatedAt: 1,
          userId: 1,
          postId: 1,
          "userDetails.email": 1,
          "userDetails.fullname": 1,
          "userDetails.username": 1,
          "userDetails.profilePic": 1,
        },
      },
    ]);

    const commentsCount = comments.length;
    return res.status(200).json({ comments, commentsCount, success: true });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = getComments;
