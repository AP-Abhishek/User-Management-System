import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/auth.js";

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Access denied. No token provided.",
        });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token as string);
    if (!decoded) {
        return res.status(401).json({
            error: "Invalid or expired token.",
        });
    }

    (req as any).user = decoded;

    next();
};
