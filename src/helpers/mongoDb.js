import { MongoClient, ObjectId } from "mongodb";

let client;

export async function connectDb() {
  client = await MongoClient.connect(process.env.MONGO_DB_URI);
  return client.db("nextKeeper");
}

export async function insertDocument(collection, document) {
  const db = await connectDb();
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getData() {
  const db = await connectDb();
  const data = await db.collection("notes").find().toArray();

  return data;
}

export async function deleteData(id) {
  const db = await connectDb();
  const data = await db
    .collection("notes")
    .deleteOne({ _id: new ObjectId(id) });

  return data;
}
