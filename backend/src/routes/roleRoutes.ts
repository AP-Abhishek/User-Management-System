import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeAdmin } from "../middlewares/authorizeAdminMiddleware.js";
import {
    addRole,
    deleteRole,
    editRole,
    getRoles,
} from "../controllers/roleController.js";

const roleRoutes = express.Router();

roleRoutes.post("/add", authenticate, authorizeAdmin, addRole);
roleRoutes.put("/:id", authenticate, authorizeAdmin, editRole);
roleRoutes.delete("/:id", authenticate, authorizeAdmin, deleteRole);
roleRoutes.get("/", authenticate, authorizeAdmin, getRoles);

export default roleRoutes;
