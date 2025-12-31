import app from "./app";
import { connectDB } from "./db/connection";
import "dotenv/config";

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server listening at ${PORT}`);
        });
    } catch (err) {
        console.error(`Failed to start server: ${err}`);
        process.exit(1);
    }
};

startServer();