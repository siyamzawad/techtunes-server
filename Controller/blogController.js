import Blog from "../Model/Blog.js";

export const createBlog = async (req, res) => {
  try {
    const { title, body, author, category } = req.body;
    if (!title || !body || !author || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newBlog = new Blog({ title, body, author, category });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import mongoose from "mongoose";

export const getBlog = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBlogsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const blogs = await Blog.find({ category: category });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, category } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the logged-in user is the creator of the blog
    if (blog.author.toString() !== req.user.username.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this blog" });
    }

    // Perform update
    blog.title = title;
    blog.body = body;
    blog.category = category;
    await blog.save();

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the logged-in user is the creator of the blog
    if (blog.author.toString() !== req.user.username.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
