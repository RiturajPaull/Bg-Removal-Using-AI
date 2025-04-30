import express from "express";
import {
  clerkWebhooks,
  razorpayController,
  userCredits,
  verifyRazorpayController,
} from "../Controllers/userController.js";
import authUser from "../Middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/webhooks", clerkWebhooks);
userRouter.get("/credits", authUser, userCredits);
userRouter.post("/pay-razor", authUser, razorpayController);
// userRouter.post("/verify-rzpay", verifyRazorpayController);
export default userRouter;
