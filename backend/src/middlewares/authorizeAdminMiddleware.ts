import type { NextFunction, Request, Response } from "express";

export const authorizeAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if ((req as any).user.role !== "admin") {
        return res.status(403).json({
            error: "Access denied.",
        });
    }
    next();
};
