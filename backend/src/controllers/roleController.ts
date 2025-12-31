import type { Request, Response } from "express";
import { getDB } from "../db/connection";

const collectionName = "roles";

export const addRole = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        });
    }
}