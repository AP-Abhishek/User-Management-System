import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { authozieAdmin } from "../middlewares/authorizeAdminMiddleware";
import {
    addRole,
    deleteRole,
    editRole,
    getRoles,
} from "../controllers/roleController";

const roleRoutes = express.Router();

roleRoutes.post("/add", authenticate, authozieAdmin, addRole);
roleRoutes.put("/:id", authenticate, authozieAdmin, editRole);
roleRoutes.delete("/:id", authenticate, authozieAdmin, deleteRole);
roleRoutes.get("/", authenticate, authozieAdmin, getRoles);

export default roleRoutes;
