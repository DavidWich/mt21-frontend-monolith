import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const { sender, recipient, subject, content } = req.body;

  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const coll = db.collection("mails");

  await coll.insertOne({
    sender,
    recipient,
    subject,
    content,
  });

  client.close();

  res.status(201).json({ message: "Sent" });
};

export default handler;
