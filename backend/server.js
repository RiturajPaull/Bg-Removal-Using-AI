import express from "express";
import cors from "cors";
import connectDB from "./Configs/mongoConfig.js";
import userRouter from "./Routes/userRoutes.js";

import dotenv from "dotenv";
app.use(express.json());

const PORT = 5000;
dotenv.config();
const app = express();
const corsConfig = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(express.json());
app.use(cors(corsConfig));

app.get("/", (req, resp) => {
  resp.send("Hello Sir ");
});
app.use("/api/user", userRouter);

await connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
  });
});
export default app;
