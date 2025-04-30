import jwt from "jsonwebtoken";

//middleware function to get clerkid

const authUser = async (req, resp, next) => {
  try {
    // req.body = {
    //   clerkId: "",
    //   planId: "",
    // };

    console.log("Request Body", req.body);
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
        message: "Request Body is missing",
      });
    }
    req.body.clerkId = token_decode.clerkId;
    console.log("Userclerk id ", req.body);
    next();
  } catch (error) {
    console.log("Error :", error);
    resp.status(500).json({ message: error.message || error, error: true });
  }
};

export default authUser;
