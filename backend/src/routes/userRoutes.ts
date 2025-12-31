import express from "express";
import {
    getAllUsers,
    getProfile,
    loginUser,
    registerUser,
} from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";
import { authozieAdmin } from "../middlewares/authorizeAdminMiddleware";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

userRoutes.get("/all-users", authenticate, authozieAdmin, getAllUsers);

userRoutes.get("/profile", authenticate, getProfile);

export default userRoutes;
