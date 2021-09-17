import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const { course, abbreviation, professor, currentPeople, maxPeople } =
    req.body;

  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const coll = db.collection("courses");

  await coll.insertOne({
    course,
    abbreviation,
    professor,
    currentPeople,
    maxPeople,
  });

  client.close();

  res.status(201).json({ message: "Inserted" });
};

export default handler;
