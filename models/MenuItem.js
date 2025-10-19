import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MenuItem =
  mongoose.models.MenuItem || mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;
