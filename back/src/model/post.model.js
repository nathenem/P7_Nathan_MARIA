const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: String,
  authorId: String,
  textContent: String,
  imageUrl: String,
  date: { type: Date, default: new Date() },
  usersLiked: [String],
  usersDisliked: [String],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
