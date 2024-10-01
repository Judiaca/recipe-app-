import dbConnect from "@/lib/mongodb";
import Ingredient from "@/models/Ingredient";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, imageUrl, flavor, description } = req.body;
    try {
      const newIngredient = new Ingredient({
        name,
        imageUrl,
        flavor,
        description,
      });
      await newIngredient.save();
      res.status(201).json(newIngredient);
    } catch (error) {
      res.status(500).json({ message: "Error creating ingredient", error });
    }
  }
}
