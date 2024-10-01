import mongoose from "mongoose";

const PairingSchema = new mongoose.Schema({
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }], // Reference to Ingredient model
  reason: { type: String, required: true },
});

export default mongoose.models.Pairing ||
  mongoose.model("Pairing", PairingSchema);
