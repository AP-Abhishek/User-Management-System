import { Db, MongoClient } from "mongodb";
import "dotenv/config";

const url = process.env.MONGODB_URL;

if (!url) {
    throw new Error("MONGODB_URL is not defined...!");
}

let db: Db;
const client = new MongoClient(url);

async function connectDB() {
    try {
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Connection Failed: ", err);
        process.exit(1);
    }
}

export async function getDB(): Promise<Db> {
    await connectDB();
    return db;
}