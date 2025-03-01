import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  getBlogsByCategory,
  updateBlog,
} from "../Controller/blogController.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);

blogRouter.get("/:id", getBlog);

blogRouter.get("/category/:category", getBlogsByCategory);

blogRouter.put("/:id", updateBlog);

blogRouter.post("/", createBlog);

blogRouter.delete("/:id", deleteBlog);

export default blogRouter;
