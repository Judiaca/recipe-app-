import dbConnect from "@/lib/mongodb";
import Pairing from "@/models/Pairing";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const pairings = await Pairing.find({}).populate("ingredients");
      res.status(200).json({ pairings });
    } catch (error) {
      res.status(500).json({ message: "Error fetching pairings", error });
    }
  }
}
