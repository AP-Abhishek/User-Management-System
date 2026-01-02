import jwt, { type SignOptions } from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not found.");
}

export const generateToken = (
    payload: object,
    expiresIn: string = "7d"
): string => {
    const options: SignOptions = {
        expiresIn: expiresIn as any,
    };
    return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
};
