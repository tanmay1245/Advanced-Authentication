import 'dotenv/config'
import express from "express";
import cors from "cors";
import connectDB from "./db/mongoose.js";
import authRouter from "./routers/auth.js";
import privateRouter from "./routers/private.js";

connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/", privateRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is up running on port", PORT);
});