import mongoose from "mongoose";

const itemScheme = mongoose.Schema(
    {
    name: { type: String, unique: true, trim: true },
    price: { type: Number, default:0 },
    },
    { timestamps: true}
);

export default mongoose.model("Item", itemSchema);
