import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import { Create } from "../../models/types";
import { connectToDatabase } from "../../lib/mongodb";
import { nanoid } from "nanoid";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST": {
      return addPath(req, res);
    }
    default: {
      return res.status(400);
    }
  }
}

const addPath = async (req: NextApiRequest, res: NextApiResponse) => {
  let { db } = await connectToDatabase();

  let data = req.body;

  data.condensed = nanoid(10);
  data.exp = dayjs(data.exp).toDate();

  let validData = Create.safeParse(data);

  if (!validData.success) {
    return res.status(400).json({ message: "Invalid Request" });
  }

  await db.collection("urls").insertOne(validData.data);

  return res.status(200).json({ message: "success", location: data.condensed });
};

export default handler;
