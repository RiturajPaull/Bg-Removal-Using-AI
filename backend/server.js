import express from "express";
import cors from "cors";
import connectDB from "./Configs/mongoConfig.js";
import userRouter from "./Routes/userRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 5000;

app.use(express.json());

console.log("URL", process.env.FRONTEND_URL);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/user", userRouter);

await connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
  });
});
export default app;
