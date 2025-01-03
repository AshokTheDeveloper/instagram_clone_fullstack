const Story = require("../../models/story.model");

const storyUpload = async (req, res) => {
  try {
    const { mediaUrl, mediaType } = req.body;
    const { id } = req.user;
    const newStory = await Story.create({
      mediaUrl,
      mediaType,
      userId: id,
    });

    if (newStory) {
      return res.status(200).json({ message: "Story created successfully" });
    }

    res.status(201).json({ story: newStory });
  } catch (error) {
    console.log("Internal server error: ", error.message);
  }
};

module.exports = storyUpload;
