import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },

  credits: {
    type: Number,
    required: true,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Number,
  },
});

const TransactionModel = mongoose.model("transaction", transactionSchema);
export default TransactionModel;
