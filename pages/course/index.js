import * as cookie from "cookie";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Course from "../../components/Course/Course";
import verifyToken from "../../assets/functions/verifyToken";

export default function CoursePage(props) {
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

  return <Course courses={props.courses} />;
}

export const getServerSideProps = async (context) => {
  const cookieStr = context.req.headers.cookie;
  if (typeof cookieStr === "undefined") {
    return { props: { books: [] } };
  }
  const cookies = cookie.parse(cookieStr);
  const token = cookies.token;
  const courses = cookies.courses;

  const code = await verifyToken(token);
  if (code !== 200) {
    return { props: { courses: [] } };
  }

  const courseQuery = JSON.parse(courses);

  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const collection = db.collection("courses");
  const coursResponse = await collection
    .find({ abbreviation: { $in: courseQuery } })
    .toArray();
  client.close();

  return {
    props: {
      courses: coursResponse.map((item) => ({
        id: item._id.toString(),
        course: item.course,
        abbreviation: item.abbreviation,
        professor: item.professor,
        currentPeople: item.currentPeople,
        maxPeople: item.maxPeople,
      })),
    },
  };
};
