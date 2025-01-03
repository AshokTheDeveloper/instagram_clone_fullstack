const Post = require("../../models/post.model");

const createPost = async (req, res) => {
  try {
    const { caption, imageUrl } = req.body;
    const { id } = req.user;

    if (!caption || !imageUrl || !id) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const newPost = {
      caption,
      imageUrl,
      userId: id,
    };

    const post = await Post.create(newPost);

    if (!post) {
      return res.status(400).json({ message: "Failed to create post" });
    } else {
      return res.status(201).json({ message: "Post created successfully" });
    }
  } catch (error) {
    console.log("Internal Server Error: ", error);
  }
};

module.exports = createPost;
