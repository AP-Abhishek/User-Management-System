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
import { authozieAdmin } from "../middlewares/authorizeAdminMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

userRoutes.get("/profile", authenticate, getProfile);
userRoutes.patch("/profile", authenticate, updateProfile);
userRoutes.patch("/profile/password", authenticate, updatePassword);

userRoutes.get("/", authenticate, authozieAdmin, getAllUsers);
userRoutes.patch("/:id", authenticate, authozieAdmin, updateUser);
userRoutes.delete("/:id", authenticate, authozieAdmin, deleteUser);

export default userRoutes;
