import express from "express";
import cors from "cors";
import connectDB from "./Configs/mongoConfig.js";
import userRouter from "./Routes/userRoutes.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(bodyParser.json());
console.log("URL", process.env.FRONTEND_URL);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.get("/", (req, resp) => {
  resp.send("Hello Server");
});
await connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
  });
});
export default app;
