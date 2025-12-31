import { Db, MongoClient } from "mongodb";
import "dotenv/config";

const url = process.env.MONGODB_URL;

if (!url) {
    throw new Error("MONGODB_URL is not defined...!");
}

let db: Db;
const client = new MongoClient(url);

export const connectDB = async () => {
    try {
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Connection Failed: ", err);
        process.exit(1);
    }
};

export const getDB = (): Db => {
    if (!db) {
        throw new Error("Database not initialized...!");
    }
    return db;
};
