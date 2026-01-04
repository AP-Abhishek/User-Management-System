import express from "express";
import {
    deleteUser,
    getAllUsers,
    getProfile,
    loginUser,
    registerUser,
    updatePassword,
    updateProfile,
    updateUser,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeAdmin } from "../middlewares/authorizeAdminMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

userRoutes.get("/profile", authenticate, getProfile);
userRoutes.patch("/profile", authenticate, updateProfile);
userRoutes.patch("/profile/password", authenticate, updatePassword);

userRoutes.get("/", authenticate, authorizeAdmin, getAllUsers);
userRoutes.patch("/:id", authenticate, authorizeAdmin, updateUser);
userRoutes.delete("/:id", authenticate, authorizeAdmin, deleteUser);

export default userRoutes;
