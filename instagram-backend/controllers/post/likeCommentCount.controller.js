const mongoose = require("mongoose");
const Post = require("../../models/post.model");

const likeCommentCount = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(postId) },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      {
        $project: {
          id: 1,
          caption: 1,
          imageUrl: 1,
          likesCount: { $size: "$likes" },
          commentsCount: { $size: "$comments" },
        },
      },
    ]);

    return res.status(200).json({ counts: post[0] });
  } catch (error) {
    console.log("Internal server error: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = likeCommentCount;
