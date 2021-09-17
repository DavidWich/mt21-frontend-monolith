import * as cookie from "cookie";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { useTranslation } from "react-i18next";

import News from "../../components/News/News";
import verifyToken from "../../assets/functions/verifyToken";

export default function NewsPage(props) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <meta name="description" content={t("meta_description.news")} />
      </Head>
      <News news={props.news} />{" "}
    </>
  );
}

export const getServerSideProps = async (context) => {
  const courseQuery = ["", "ALL"];

  const cookieStr = context.req.headers.cookie;
  if (typeof cookieStr !== "undefined") {
    const cookies = cookie.parse(cookieStr);
    const token = cookies.token;
    const courses = cookies.courses;

    const code = await verifyToken(token);
    if (courses && code === 200) {
      courseQuery.push(...JSON.parse(courses));
    }
  }

  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const collection = db.collection("news");
  const news = await collection
    .find({ course: { $in: courseQuery } })
    .toArray();
  client.close();

  return {
    props: {
      news: news.map((item) => ({
        id: item._id.toString(),
        title: item.title,
        description: item.description,
        date: item.date,
        author: item.author,
        course: item.course ? item.course : "",
        content: item.content,
      })),
    },
  };
};
