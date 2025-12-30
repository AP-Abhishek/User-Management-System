import * as dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
});
