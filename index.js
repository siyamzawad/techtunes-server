/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import { connectDB } from "./config/db.js";
import categoryRouter from "./Router/category.js";
import userRouter from "./Router/user.js";
import blogRouter from "./Router/blog.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.PORT;

app.use("/user", userRouter);

app.use("/blogs", blogRouter);
app.use("/categories", categoryRouter);
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
