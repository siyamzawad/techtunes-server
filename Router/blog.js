import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  getBlogsByCategory,
  updateBlog,
} from "../Controller/blogController.js";
import { auth } from "../Middleware/auth.js";
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);

blogRouter.get("/:id", getBlog);

blogRouter.get("/category/:category", getBlogsByCategory);

blogRouter.put("/:id", auth, updateBlog);

blogRouter.post("/", auth, createBlog);

blogRouter.delete("/:id", auth, deleteBlog);

export default blogRouter;
