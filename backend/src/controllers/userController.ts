import type { Request, Response } from "express";
import { getDB } from "../db/connection";
import type { UserSchema } from "../db/schema";
import bcrypt from "bcryptjs";
import { ObjectId, type WithId } from "mongodb";
import { generateToken } from "../utils/auth";

const collectionName = "users";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const db = getDB();

        const { firstName, lastName, username, email, password, role } =
            req.body;

        const usernameExists = await db
            .collection(collectionName)
            .findOne({ username });
        if (usernameExists) {
            return res.status(400).json({
                error: "Username already exits.",
            });
        }

        const emailExists = await db
            .collection(collectionName)
            .findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                error: "Email already exists.",
            });
        }

        const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser: UserSchema = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword,
            role: role,
            is_active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection(collectionName).insertOne(newUser);
        res.status(201).json({
            message: "User registerd successfully.",
            id: result.insertedId,
        });
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const db = getDB();

        const { email, password } = req.body;

        const user = (await db.collection(collectionName).findOne({
            email,
        })) as WithId<UserSchema> | null;
        if (!user) {
            return res.status(401).json({
                error: "Invalid email.",
            });
        }

        const verifiedPassword = await bcrypt.compare(password, user.password);
        if (!verifiedPassword) {
            return res.status(401).json({
                error: "Invalid Password.",
            });
        }
        if (!user.is_active) {
            return res.status(403).json({
                error: "Your account has been deactivated. Kindly, contact to admin.",
            });
        }

        const token = generateToken({ id: user._id, role: user.role });
        res.status(200).json({
            message: "Login successfull.",
            token: token,
            user: {
                id: user._id,
                role: user.role,
                firstName: user.firstName,
            },
        });
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const db = getDB();

        const users = await db
            .collection(collectionName)
            .find({}, { projection: { password: 0 } })
            .toArray();
        res.status(200).json(users);
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const db = getDB();

        const { id } = req.params;
        const { role, is_active } = req.body;

        const result = await db
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { role, is_active, updatedAt: new Date() } },
                { returnDocument: "after", projection: { password: 0 } }
            );

        if (!result) {
            return res.status(404).json({
                error: "User not found.",
            });
        }

        res.status(200).json({
            message: "User updated successfully.",
            user: result,
        });
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const db = getDB();

        const { id } = req.params;
        const result = await db.collection(collectionName).findOneAndDelete({
            _id: new ObjectId(id),
        });
        if (!result) {
            return res.status(404).json({
                error: "User not found.",
            });
        }
        res.status(200).json({
            message: "User deleted successfully.",
        });
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const db = getDB();

        const userId = (req as any).user.id;
        const user = await db
            .collection(collectionName)
            .findOne(
                { _id: new ObjectId(userId) },
                { projection: { password: 0 } }
            );
        if (!user) {
            return res.status(404).json({
                error: "User not found.",
            });
        }
        res.status(200).json(user);
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const db = getDB();

        const id = (req as any).user.id;
        const { firstName, lastName, username, email } = req.body;

        const user = await db
            .collection(collectionName)
            .findOne({ _id: new ObjectId(id) });

        if (!user) {
            return res.status(404).json({
                error: "User not found.,",
            });
        }

        if (user.username !== username) {
            if (await db.collection(collectionName).findOne({ username })) {
                return res.status(400).json({
                    error: "Username already exits.",
                });
            }
        }

        if (user.email !== email) {
            if (await db.collection(collectionName).findOne({ email })) {
                return res.status(400).json({
                    error: "Email already exists.",
                });
            }
        }

        const result = await db.collection(collectionName).findOneAndUpdate(
            { _id: new ObjectId(id) },
            {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    updatedAt: new Date(),
                },
            },
            { returnDocument: "after", projection: { password: 0 } }
        );
        if (!result) {
            return res.status(404).json({
                error: "User not found.",
            });
        }
        res.status(200).json({
            message: "User updated successfully.",
            user: result,
        });
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        });
    }
};

export const updatePassword = async (req: Request, res: Response) => {
    try {
        const db = getDB();

        const id = (req as any).user.id;
        const { password } = req.body;

        const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await db
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { password: hashedPassword, updatedAt: new Date() } }
            );

        if (!result) {
            return res.status(404).json({
                error: "User not found.",
            });
        }

        res.status(200).json({
            message: "Password updated successfully.",
        });
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        });
    }
};
