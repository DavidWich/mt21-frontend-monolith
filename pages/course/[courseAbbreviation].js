import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CourseDetail from "../../components/Course/CourseDetail";
import CourseError from "../../components/Course/CourseError";

export default function CourseDetailPage(props) {
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

  if (props.error) {
    return <CourseError abbreviation={props.abbreviation} />;
  }
  return <CourseDetail courseData={props.courseData} />;
}

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const collection = client.db().collection("courses");
  const courses = await collection.find({}, { abbreviation: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: courses.map((course) => ({
      params: { courseAbbreviation: course.abbreviation },
    })),
  };
};

export const getStaticProps = async (context) => {
  const courseAbbreviation = context.params.courseAbbreviation;

  const client = await MongoClient.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const collection = client.db().collection("courses");
  const course = await collection.findOne({
    abbreviation: courseAbbreviation,
  });

  client.close();

  if (!course) {
    return { props: { error: true, abbreviation: courseAbbreviation } };
  }

  return {
    props: {
      courseData: {
        id: course._id.toString(),
        course: course.course,
        abbreviation: course.abbreviation,
        professor: course.professor,
        currentPeople: course.currentPeople,
        maxPeople: course.maxPeople,
      },
    },
  };
};
