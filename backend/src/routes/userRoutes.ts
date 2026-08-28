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
import { restrictDemoMutation } from "../middlewares/restrictDemoMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

userRoutes.get("/profile", authenticate, getProfile);
userRoutes.patch("/profile", authenticate, restrictDemoMutation, updateProfile);
userRoutes.patch("/profile/password", authenticate, restrictDemoMutation, updatePassword);

userRoutes.get("/", authenticate, authorizeAdmin, getAllUsers);
userRoutes.patch("/:id", authenticate, authorizeAdmin, restrictDemoMutation, updateUser);
userRoutes.delete("/:id", authenticate, authorizeAdmin, restrictDemoMutation, deleteUser);

export default userRoutes;
