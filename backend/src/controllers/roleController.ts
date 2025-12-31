import type { Request, Response } from "express";
import { getDB } from "../db/connection";
import { ObjectId } from "mongodb";

const collectionName = "roles";

export const addRole = async (req: Request, res: Response) => {
    try {
        const db = getDB();

        const { roleName } = req.body;
        if (await db.collection(collectionName).findOne({ name: roleName })) {
            return res.status(409).json({
                error: "Role already exists.",
            });
        }

        const result = await db
            .collection(collectionName)
            .insertOne({ name: roleName });

        res.status(201).json({
            message: "Role created.",
            id: result.insertedId,
        });
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        });
    }
};

export const editRole = async (req: Request, res: Response) => {
    try {
        const db = getDB();

        const { id } = req.params;
        const { roleName } = req.body;

        const result = await db.collection(collectionName).findOneAndUpdate(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name: roleName,
                },
            },
            { returnDocument: "after" }
        );

        if (!result) {
            return res.status(404).json({
                message: "Role not found.",
            });
        }

        res.status(200).json({
            message: "Role updated.",
        });
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        });
    }
};

export const deleteRole = async (req: Request, res: Response) => {
    try {
        const db = getDB();

        const { id } = req.params;

        const result = await db
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(id) });

        if (!result) {
            return res.status(404).json({
                message: "Role not found.",
            });
        }
        res.status(200).json({
            message: "Role deleted.",
        });
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        });
    }
};

export const getRoles = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const roles = await db.collection(collectionName).find({}).toArray();
        res.status(200).json({
            roles: roles,
        });
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        });
    }
};
