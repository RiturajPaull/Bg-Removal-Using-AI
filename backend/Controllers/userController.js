import UserModel from "../Models/UserModel.js";
import { Webhook } from "svix";
import dotenv from "dotenv";
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
      case "use r.deleted": {
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
    const { clerkId } = req.body;

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

export { clerkWebhooks, userCredits };
