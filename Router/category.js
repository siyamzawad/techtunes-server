import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getSingleCategory,
} from "../Controller/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getSingleCategory);
categoryRouter.post("/", createCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
