import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  fullname: { type: String, required: true },
  skills: [
    {
      skill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skills",
        required: true,
      },
      level: { type: Number, min: 1, max: 5, required: true },
    },
  ],
  description: { type: String, required: true },
  rating: { type: Number, default: 0 },
  totalReviews: {
    type: Number,
    default: 0,
  },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
});

export default mongoose.model("Workers", workerSchema);
