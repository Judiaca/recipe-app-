import dbConnect from "lib/mongodb";
import FlavourCombination from "models/FlavourCombination";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const flavours = await FlavourCombination.find({}).populate("ingredients");
    res.status(200).json(flavours);
  } else if (req.method === "POST") {
    const flavour = await FlavourCombination.create(req.body);
    res.status(201).json(flavour);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
