import { MongoClient } from "mongodb";

import accounts from "../../assets/test-data/accounts";
import books from "../../assets/test-data/books";
import courses from "../../assets/test-data/courses";
import emails from "../../assets/test-data/emails";
import news from "../../assets/test-data/news";

const handler = async (req, res) => {
  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();

  db.dropDatabase();

  await db.collection("accounts").insertMany(accounts);
  await db.collection("books").insertMany(books);
  await db.collection("courses").insertMany(courses);
  await db.collection("mails").insertMany(emails);
  await db.collection("news").insertMany(news);

  client.close();

  res.status(201).json({ message: "Inserted" });
};

export default handler;
