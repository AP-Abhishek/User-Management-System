import express from "express";
import { getProfile, loginUser, registerUser } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

userRoutes.get("/profile", authenticate, getProfile);

export default userRoutes;