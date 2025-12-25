import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  profileImage: {
    type: String,
    default: "",
  },
  profileCompleted: {
    type: Boolean,
    default: true,
  },
});
export default mongoose.model("Customers", customerSchema);
