import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  id: String,
  name: { type: String, required: true },
  imageUrl: String,
  flavor: [String],
  description: String,
});

export default mongoose.models.Ingredient ||
  mongoose.model("Ingredient", IngredientSchema);
