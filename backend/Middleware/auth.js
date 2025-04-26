import jwt from "jsonwebtoken";

//middleware function to get clerkid

export const authUser = async (req, resp, next) => {
  try {
    console.log("Req body", req.body);
    const { token } = req.headers;

    if (!token) {
      return resp.json({
        success: false,
        message: "token missing",
      });
    }

    const token_decode = jwt.decode(token);
    console.log("After decode", token_decode);

    if (!req.body) {
      return resp.status(400).json({
        message: "Rewuest Body is missing",
      });
    }
    req.body.clerkId = token_decode.clerkId;
    console.log("Userclerk id ", req.body.clerkId);
    next();
  } catch (error) {
    console.log("Error :", error);
    resp.status(500).json({ message: error.message || error, error: true });
  }
};
