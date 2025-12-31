import type { Request, Response } from "express";
import { getDB } from "../db/connection";
import type { UserSchema } from "../db/schema";
import bcrypt from "bcryptjs";
import type { WithId } from "mongodb";
import { generateToken } from "../utils/auth";

const collectionName = "users";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const db = await getDB();
        const collection = await db.collection(collectionName);

        const { firstName, lastName, username, email, password, role } =
            await req.body;

        const usernameExists = await collection.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({
                error: "Username already exits.",
            });
        }

        const emailExists = await collection.findOne({ email });
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
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(newUser);
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
        const db = await getDB();
        const collection = await db.collection(collectionName);

        const { email, password } = await req.body;

        const user = (await collection.findOne({
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
        const token = generateToken({ id: user._id, role: user.role });
        res.status(200).json({
            message: "Login successfull.",
            token: token,
        });
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        });
    }
};
