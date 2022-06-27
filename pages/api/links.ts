import type { NextApiRequest, NextApiResponse } from 'next'
import { Create } from "../../models/types"
import { connectToDatabase } from "../../lib/mongodb"
import { nanoid } from 'nanoid'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return addPath(req, res)
    }
    default: {
      return res.status(400)
    }
  }
}

const addPath = async (req: NextApiRequest, res: NextApiResponse) => {
  let { db } = await connectToDatabase()

  let validData = Create.safeParse(JSON.parse(req.body))

  if (!validData.success) {
    return res.status(400)
  }

  validData.data.condensed = nanoid(10)

  await db.collection("urls").insertOne(validData.data)

  return res.status(200)
}

