import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);

app.get("/", async (req, res) => {
    res.send("Hello");
});

export default app;
