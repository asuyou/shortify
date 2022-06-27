import { connectToDatabase } from "../../lib/mongodb"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { db } = await connectToDatabase()

  let newLocation = db.collection("urls").findOne({condensed: req.query.id})
  return res.status(200).json({data: newLocation})
}
