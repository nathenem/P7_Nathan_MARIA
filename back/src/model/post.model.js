const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: String,
  authorId: String,
  textContent: String,
  imageUrl: String,
  date: Date,
  usersLiked: [String],
  usersDisliked: [String],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
