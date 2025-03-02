import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  likes: { type: Number, default: 0 },
  reports: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
