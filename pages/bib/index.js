import * as cookie from "cookie";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Bib from "../../components/Bib/Bib";
import verifyToken from "../../assets/functions/verifyToken";

export default function BibPage(props) {
  const router = useRouter();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!rendered) {
      setRendered(true);
    } else if (!isAuth) {
      router.replace("/");
    }
  }, [rendered, isAuth]);

  if (!isAuth) {
    return null;
  }

  return <Bib books={props.books} />;
}

export const getServerSideProps = async (context) => {
  const cookieStr = context.req.headers.cookie;
  if (typeof cookieStr === "undefined") {
    return { props: { books: [] } };
  }
  const cookies = cookie.parse(cookieStr);
  const token = cookies.token;

  const code = await verifyToken(token);
  if (code !== 200) {
    return { props: { books: [] } };
  }

  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const collection = db.collection("books");
  const books = await collection.find().toArray();
  client.close();

  return {
    props: {
      books: books.map((item) => ({
        id: item._id.toString(),
        title: item.title,
        author: item.author,
        year: item.year,
        isbn: item.isbn,
      })),
    },
  };
};
