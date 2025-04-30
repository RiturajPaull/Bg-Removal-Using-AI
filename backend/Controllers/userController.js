import UserModel from "../Models/UserModel.js";
import { Webhook } from "svix";
import razorpay from "razorpay";
import dotenv from "dotenv";
import TransactionModel from "../Models/TransactionSchema.js";
dotenv.config();

export const config = {
  api: {
    bodyParser: false,
  },
};

const clerkWebhooks = async (req, resp) => {
  try {
    console.log("Req Headers", req.headers);
    console.log("Request Body", req.body);
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    const { data, type } = req.body;
    console.log("Data", data);
    console.log("Type", type);

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await UserModel.create(userData);
        resp.json({});
        break;
      }
      case "user.updated": {
        console.log("Updating user with clerkId:", data.id);

        const updatedUser = await UserModel.findOneAndUpdate(
          { clerkId: data.id },
          {
            email: data.email_addresses[0].email_address,
            firstName: data.first_name,
            lastName: data.last_name,
            photo: data.image_url,
          },
          { new: true }
        );

        if (updatedUser) {
          console.log("✅ User updated:", updatedUser.email);
        } else {
          console.log("❌ User not found for update:", data.id);
        }

        break;
        // const userData = {
        //   email: data.email_addresses[0].email_address,
        //   firstName: data.first_name,
        //   lastName: data.last_name,
        //   photo: data.image_url,
        // };

        // await UserModel.findOneAndUpdate({ clerkId: data.id }, userData);
        // resp.json({});
        // break;
      }
      case "user.deleted": {
        console.log("Attempting to delete user with clerkId:", data.id);
        const deletedUser = await UserModel.findOneAndDelete({
          clerkId: data.id,
        });

        if (deletedUser) {
          console.log("✅ User deleted from DB:", deletedUser.email);
        } else {
          console.log("❌ No user found with clerkId:", data.id);
        }

        break;

        // await UserModel.findOneAndDelete({ clerkId: data.id });
        // resp.json({});
        // break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log("Error", error);
    resp.status(400).json({ error: true, message: error.message });
  }
};

//API controller function to get the available credits

const userCredits = async (req, resp) => {
  try {
    //create a token that will give us the userid
    const clerkId = req.body.clerkId;

    const userData = await UserModel.findOne({ clerkId });

    resp.status(200).json({
      success: true,
      credits: userData.creditBalance,
    });
  } catch (error) {
    console.log("Error :", error.message);
    return resp.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

// ----------------------------
// RAZOR PAY API INTEGRATION
// ----------------------------

// 1. Razor pay instance creation
const razorpayInstance = new razorpay({
  key_id: process.env.RAZOYPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 2. Razor pay controller

const razorpayController = async (req, resp) => {
  try {
    const { clerkId, planId } = req.body;
    console.log("Clerk id and plan id", req.body);
    const userData = await UserModel.findOne({ clerkId });

    if (!userData || !planId) {
      return resp.status(400).json({
        success: false,
        error: true,
        message: "Invalid Credentials",
      });
    }
    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        (plan = "Basic"), (credits = 100), (amount = 10);

        break;
      case "Advanced":
        (plan = "Advanced"), (credits = 500), (amount = 50);

        break;
      case "Business":
        (plan = "Business"), (credits = 5000), (amount = 250);
        break;

      default:
        return resp.status(400).json({
          message: "Plan not found",
          error: true,
          success: false,
        });
    }

    date = Date.now();

    // Creating transaction

    const transactionData = {
      clerkId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await TransactionModel.create(transactionData);
    console.log("New Transaction", newTransaction);

    // to create the reazorpay order first create options
    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log("Error after rzPayInstance");
        return resp.status(400).json({
          message: error.message || error,
          success: false,
          error: true,
        });
      }

      return resp.status(201).json({
        message: "Payment Successfull",
        success: true,
        error: false,
        data: order,
      });
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const verifyRazorpayController = async (req, resp) => {
  try {
    const razorpay_order_id = req.body.razorpay_id;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      const transactionData = await TransactionModel.findById(
        orderInfo.receipt
      );
      //defau;t payment is false
      if (transactionData.payment) {
        return resp.status(201).json({
          message: "Payment failed",
          error: true,
          success: true,
        });
      }

      const userData = await UserModel.findById({
        clerkId: transactionData.clerkId,
      });
      const creditBalance = userData.creditBalance + transactionData.credits;
      await UserModel.findByIdAndUpdate(userData._id, { creditBalance });
      await TransactionModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });
      return resp.status(201).json({
        message: "Credits Added",
        success: true,
        error: false,
      });
    }
  } catch (error) {
    console.log("Payment Verification error");
    return resp.status(500).json({
      message: error.message || error,
      error: false,
      success: true,
    });
  }
};
export {
  clerkWebhooks,
  userCredits,
  razorpayController,
  verifyRazorpayController,
};
