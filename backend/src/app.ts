import express from "express";
import cors from "cors";
import { getDB } from "./config/db";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    const db = await getDB();
    const users = db.collection("users").find().toArray();
    res.send("User Management System + MongoDB working."+JSON.stringify(users));
});

export default app;
