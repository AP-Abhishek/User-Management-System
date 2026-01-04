import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authozieAdmin } from "../middlewares/authorizeAdminMiddleware.js";
import {
    addRole,
    deleteRole,
    editRole,
    getRoles,
} from "../controllers/roleController.js";

const roleRoutes = express.Router();

roleRoutes.post("/add", authenticate, authozieAdmin, addRole);
roleRoutes.put("/:id", authenticate, authozieAdmin, editRole);
roleRoutes.delete("/:id", authenticate, authozieAdmin, deleteRole);
roleRoutes.get("/", authenticate, authozieAdmin, getRoles);

export default roleRoutes;
