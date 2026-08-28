import type { NextFunction, Request, Response } from "express";

const DEMO_EMAILS = ["admin@test.com", "user@test.com"];

export const restrictDemoMutation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = (req as any).user;

    if (user && DEMO_EMAILS.includes(user.email)) {
        if (req.method === "GET") {
            return next();
        }

        return res.status(403).json({
            error: "Demo accounts are read-only. Changes are prohibited.",
        });
    }

    next();
};
