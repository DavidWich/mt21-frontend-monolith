import * as cookie from "cookie";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Mail from "../../components/Mail/Mail";
import verifyToken from "../../assets/functions/verifyToken";

export default function MailPage(props) {
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

  return <Mail mails={props.mails} />;
}

export const getServerSideProps = async (context) => {
  const cookieStr = context.req.headers.cookie;
  if (typeof cookieStr === "undefined") {
    return { props: { books: [] } };
  }
  const cookies = cookie.parse(cookieStr);
  const { email, token } = cookies;

  const code = await verifyToken(token);
  if (code !== 200) {
    return { props: { mails: [] } };
  }

  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const collection = db.collection("mails");
  const mails = await collection.find({ recipient: email }).toArray();
  client.close();

  return {
    props: {
      mails: mails.map((item) => ({
        id: item._id.toString(),
        sender: item.sender,
        recipient: item.recipient,
        subject: item.subject,
        content: item.content,
      })),
    },
  };
};
