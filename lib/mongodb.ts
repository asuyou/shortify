import { MongoClient, Db } from 'mongodb'

type ReturnType = {
  client: MongoClient,
  db: Db
}

const uri = process.env.MONGODB_URI || ""
const dbName = process.env.MONGODB_DB || ""
const options = {}

let cachedClient: MongoClient
let cachedDB: Db

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

export const connectToDatabase = async (): Promise<ReturnType> => {
  if (cachedClient) {
    return {
      client: cachedClient,
      db: cachedDB
    }
  }

  const client: MongoClient = new MongoClient(uri, options);
  
  await client.connect()

  const db: Db = client.db(dbName);

  cachedClient = client
  cachedDB = db

  return {
    client: client,
    db: db
  }
}

