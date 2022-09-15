const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: String,
  textContent: String,
  imageUrl: String,
  date: { type: Date, default: new Date() },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: [String],
  usersDisliked: [String],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
