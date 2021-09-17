import { MongoClient, ObjectId } from "mongodb";

import verifyToken from "../../assets/functions/verifyToken";

const handler = async (req, res) => {
  const { items, token } = req.body;

  if (!(items && token)) {
    return res.status(404).json({});
  }

  const code = await verifyToken(token);
  if (code !== 200) {
    return res.status(code).end();
  }

  const bookIds = items.map((id) => ObjectId(id));

  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const coll = db.collection("books");
  const books = await coll.find({ _id: { $in: bookIds } }).toArray();

  client.close();
  return res.status(200).json({ books });
};

export default handler;
