import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import UserModel from "../Models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

// const CLIPDROP_API_KEY =
//   "db936afae13a7508bfce58fd0fa056fde16ccd0f342c376521daaed97d1819a12d56c51f1ab5e22daa4e90165f4abc81";

// Controller function to remove bg from image

const removeBgImage = async (req, resp) => {
  try {
    console.log("API KEY", process.env.CLIPDROP_API_KEY.length);
    console.log("Req body from auth user", req.body.clerkId);
    const { clerkId } = req.body;

    const user = await UserModel.findOne({ clerkId });

    console.log("User", user);
    if (!user) {
      return resp.status(400).json({
        message: "No such user found",
        success: false,
        error: true,
      });
    }

    if (user.creditBalance === 0) {
      return resp.status(400).json({
        message: "Not enough credit left. Click on credit to buy",
        creditBalance: user.creditBalance,
        error: true,
        success: false,
      });
    }

    console.log("Req file path", req.file.path);
    const imagePath = req.file.path;

    //reading the image file

    const imageFile = fs.createReadStream(imagePath);

    const formData = new FormData();
    formData.append("image_file", imageFile);

    const { data } = await axios.post(
      "https://clipdrop-api.co/remove-background/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    console.log("Data Image", data);
    //converting the image into a base 64 and get the image
    const base64Image = Buffer.from(data, "binary").toString("base64");

    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    //deduct the user credit balance after generating the image

    await UserModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    return resp.status(201).json({
      message: "Successfully removed the bg",
      data: {
        creditBalance: user.creditBalance,
        resultImage,
      },
      error: false,
      success: true,
    });
  } catch (error) {
    console.log("Clip drop API error : ", error.message);
    return resp.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default removeBgImage;
