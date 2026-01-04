import app from "./app";
import { connectDB } from "./db/connection";
import dotenv from "dotenv";

let isConnected = false;

const handler = async (req: any, res: any) => {
    try {
        if (!isConnected) {
            await connectDB();
            isConnected = true;
        }
        return app(req, res);
    } catch (err) {
        console.error("Handler Error: ", err);
        res.status(500).send("Internal Server Error");
    }
};

if (process.env.NODE_ENV !== "production") {
    dotenv.config();

    const PORT = process.env.PORT;
    (async () => {
        try {
            await connectDB();
            app.listen(PORT, () => {
                console.log(`Server listening at ${PORT}`);
            });
        } catch (err) {
            console.error(`Failed to start server: ${err}`);
            process.exit(1);
        }
    })();
}

export default handler;
