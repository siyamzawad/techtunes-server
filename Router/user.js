import express from "express";
import { getMe, login, signup } from "../Controller/userController.js";
import { auth } from "../Middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/me", auth, getMe);

export default userRouter;
