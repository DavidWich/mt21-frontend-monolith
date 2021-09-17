import * as cookie from "cookie";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Dashboard from "../components/Dashboard/Dashboard";
import Welcome from "../components/Welcome/Welcome";
import verifyToken from "../assets/functions/verifyToken";

export default function HomePage(props) {
  const { t } = useTranslation();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (isAuth) {
    return (
      <>
        <Head>
          <meta name="description" content={t("meta_description.dashboard")} />
        </Head>
        <Dashboard {...props} />
      </>
    );
  }

  return (
    <>
      <Head>
        <meta name="description" content={t("meta_description.home")} />
      </Head>
      <Welcome />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const cookieStr = context.req.headers.cookie;
  if (typeof cookieStr === "undefined") {
    return { props: { books: [] } };
  }
  const cookies = cookie.parse(cookieStr);
  const token = cookies.token;
  const coursesCookie = cookies.courses;

  const code = await verifyToken(token);
  if (!(coursesCookie && code === 200)) {
    return { props: { books: [], courses: [], mails: [], news: [] } };
  }

  const parsedCourses = JSON.parse(coursesCookie);

  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const booksCollection = db.collection("books");
  const books = await booksCollection.find().toArray();
  const coursesCollection = db.collection("courses");
  const courses = await coursesCollection
    .find({ abbreviation: { $in: parsedCourses } })
    .toArray();
  const mailsCollection = db.collection("mails");
  const mails = await mailsCollection.find().toArray();
  const newsCollection = db.collection("news");
  const news = await newsCollection
    .find({ course: { $in: parsedCourses.concat("", "ALL") } })
    .toArray();
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
      courses: courses.map((item) => ({
        id: item._id.toString(),
        course: item.course,
        abbreviation: item.abbreviation,
        professor: item.professor,
        currentPeople: item.currentPeople,
        maxPeople: item.maxPeople,
      })),
      mails: mails.map((item) => ({
        id: item._id.toString(),
        sender: item.sender,
        recipient: item.recipient,
        subject: item.subject,
        content: item.content,
      })),
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
