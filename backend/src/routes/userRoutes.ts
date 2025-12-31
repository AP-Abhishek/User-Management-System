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
} from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";
import { authozieAdmin } from "../middlewares/authorizeAdminMiddleware";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

userRoutes.get("/", authenticate, authozieAdmin, getAllUsers);
userRoutes.patch("/:id", authenticate, authozieAdmin, updateUser);
userRoutes.delete("/:id", authenticate, authozieAdmin, deleteUser);

userRoutes.get("/profile", authenticate, getProfile);
userRoutes.patch("/profile", authenticate, updateProfile);
userRoutes.patch("/profile/password", authenticate, updatePassword);

export default userRoutes;
