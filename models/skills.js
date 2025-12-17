import mongoose from "mongoose";
const skillSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  category: { type: String },
  isActive: { type: Boolean, default: true },
});
export default mongoose.model("Skills", skillSchema);
