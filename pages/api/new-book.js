import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const { title, author, year, isbn } = req.body;

  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const coll = db.collection("books");

  await coll.insertOne({
    title,
    author,
    year,
    isbn,
  });

  client.close();

  res.status(201).json({ message: "Inserted" });
};

export default handler;
