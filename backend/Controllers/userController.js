import UserModel from "../Models/UserModel.js";
import { Webhook } from "svix";
import getRawBody from "raw-body";
import dotenv from "dotenv";
dotenv.config();

export const config = {
  api: {
    bodyParser: false,
  },
};

console.log("MONGO URL", process.env.MONGO_URI);
const clerkWebhooks = async (req, resp) => {
  // we need an id for the clerk so commit ur project in github and then
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  try {
    console.log("Request Body:", req.body);
    // Create a SVIX instance with clerk webhook secret
    const payloadBuffer = await getRawBody(req);
    const payload = payloadBuffer.toString();

    const whook = new Webhook(WEBHOOK_SECRET);
    const evt = await whook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    // if we don't have any error then the webhook events are correct then we will check the type of the event
    const { data, type } = evt;
    console.log("✅ Clerk Webhook Type:", type);
    console.log("📬 Email Addresses Object:", data.email_addresses);

    try {
      if (type === "user.created") {
        await UserModel.create({
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          imageUrl: data.image_url,
        });
      }
    } catch (error) {
      console.log("Webhook error", error);
      resp.status(500).json({ error: "Webhook handling error" });
    }
    // switch (type) {
    //   // Creating a new user
    //   case "user.created": {
    //     const userData = {
    //       clerkId: data.id, // the id of the clerk
    //       email: data.email_addresses[0].email_address,
    //       firstName: data.first_name,
    //       lastName: data.last_name,
    //       photo: data.image_url,
    //     };
    //     await UserModel.create(userData);
    //     resp.status(200).json({
    //       message: "User Created",
    //       success: true,
    //     });
    //     break;
    //   }
    //   case "user.updated": {
    //     const userData = {
    //       clerkId: data.id, // the id of the clerk
    //       email: data.email_addresses[0].email_address,
    //       firstName: data.first_name,
    //       fullName: data.full_name,
    //       photo: data.image_url,
    //     };

    //     await UserModel.findByIdAndUpdate({ clerkId: data.id }, userData);
    //     resp.status(200).json({
    //       message: "User Updated",
    //       success: true,
    //     });
    //     break;
    //   }
    //   case "user.deleted": {
    //     await UserModel.findOneAndDelete({ clerkId: data.id });
    //     resp.status(200).json({
    //       message: "User Deleted",
    //       success: true,
    //     });
    //     break;
    //   }

    //   default:
    //     resp.status(400).json({ error: error.message });
    //     break;
    // }
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { clerkWebhooks };

// import UserModel from "../Models/UserModel.js";
// import getRawBody from "raw-body";
// import { Webhook } from "svix";
// import dotenv from "dotenv";
// dotenv.config();

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const clerkWebhooks = async (req, res) => {
//   console.log("🔥 Clerk webhook received:", req.method);
//   const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   try {
//     const payload = (await getRawBody(req)).toString();
//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     const wh = new Webhook(WEBHOOK_SECRET);
//     const evt = wh.verify(payload, headers);

//     const { data, type } = evt;

//     console.log("✅ Clerk Webhook Data:", data);
//     console.log("✅ Clerk Webhook Event:", type);

//     switch (type) {
//       case "user.created": {
//         const userData = {
//           clerkId: data.id,
//           email: data.email_addresses[0].email_address,
//           firstName: data.first_name,
//           lastName: data.last_name,
//           photo: data.image_url,
//         };

//         await UserModel.create(userData);
//         return res.status(200).json({ success: true });
//       }

//       case "user.updated": {
//         const userData = {
//           email: data.email_addresses[0].email_address,
//           firstName: data.first_name,
//           lastName: data.last_name,
//           photo: data.image_url,
//         };
//         await UserModel.findOneAndUpdate({ clerkId: data.id }, userData);
//         return res.status(200).json({ success: true });
//       }

//       case "user.deleted": {
//         await UserModel.findOneAndDelete({ clerkId: data.id });
//         return res.status(200).json({ success: true });
//       }

//       default:
//         return res.status(400).json({ error: "Unhandled webhook event type." });
//     }
//   } catch (error) {
//     console.error("❌ Webhook Error:", error);
//     return res.status(500).json({
//       message: error.message || "Webhook handler error",
//       success: false,
//     });
//   }
// };

// export { clerkWebhooks };
