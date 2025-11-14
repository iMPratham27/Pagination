import express, { Application } from "express"
import { connectDB } from "./config/db"
import { postRouter } from "./routes/postRoutes"
import cors from "cors";

connectDB();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRouter);

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is runnning on port ${process.env.PORT}.`);
});
