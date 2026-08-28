import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeAdmin } from "../middlewares/authorizeAdminMiddleware.js";
import { restrictDemoMutation } from "../middlewares/restrictDemoMiddleware.js";
import {
    addRole,
    deleteRole,
    editRole,
    getRoles,
} from "../controllers/roleController.js";

const roleRoutes = express.Router();

roleRoutes.post("/add", authenticate, authorizeAdmin, restrictDemoMutation, addRole);
roleRoutes.put("/:id", authenticate, authorizeAdmin, restrictDemoMutation, editRole);
roleRoutes.delete("/:id", authenticate, authorizeAdmin, restrictDemoMutation, deleteRole);
roleRoutes.get("/", authenticate, authorizeAdmin, getRoles);

export default roleRoutes;
