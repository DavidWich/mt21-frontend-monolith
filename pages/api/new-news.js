import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const { title, description, author, course, content } = req.body;

  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const coll = db.collection("news");

  await coll.insertOne({
    title,
    description,
    author,
    date,
    course: course ? course : "ALL",
    content,
  });

  client.close();

  res.status(201).json({ message: "Inserted" });
};

export default handler;
