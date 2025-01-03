const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
