import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  creditBalance: {
    type: Number,
    default: 5,
  },
});

const UserModel = mongoose.model("user", userSchema);

// to get the clerk data to the backend we have to use Clerk WebHook
export default UserModel;
