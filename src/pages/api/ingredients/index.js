import dbConnect from "@/lib/mongodb";
import Ingredient from "@/models/Ingredient";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const ingredients = await Ingredient.find({});
      res.status(200).json({ ingredients });
    } catch (error) {
      res.status(500).json({ message: "Error fetching ingredients", error });
    }
  }
}
