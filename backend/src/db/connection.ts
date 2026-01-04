import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const url = process.env.MONGODB_URL;
const db_name = process.env.DB_NAME;

if (!url) {
    throw new Error("MONGODB_URL is not defined...!");
}

let client: MongoClient | null = (global as any).mongoClient || null;
let db: Db | null = (global as any).mongoDb || null;

export const connectDB = async () => {
    if (client && db) {
        return { client, db };
    }

    const newClient = new MongoClient(url);
    await newClient.connect();
    const newDB = newClient.db(db_name);

    (global as any).mongoClient = newClient;
    (global as any).mongoDb = newDB;

    client = newClient;
    db = newDB;

    console.log("Connected to MongoDB");
    return { client: newClient, db: newDB };
};

export const getDB = (): Db => {
    if (!db) {
        throw new Error("Database not initialized...!");
    }
    return db;
};
