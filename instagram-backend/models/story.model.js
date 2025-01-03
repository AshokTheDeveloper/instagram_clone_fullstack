const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
    },
    expiresAt: {
      type: Date,
      default: () => Date.now() + 24 * 60 * 60 * 1000,
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("story", StorySchema);
module.exports = Story;
