import { connectToDatabase } from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { db } = await connectToDatabase();

  let newLocation = await db.collection("urls").findOne({
    condensed: req.query.id,
    exp: {
      $gt: new Date(),
    },
  });
  if (!newLocation) return res.status(400).json({ error: true });
  return res.status(200).json(newLocation);
}
