import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import classes from "./CourseDetail.module.css";

export default function CourseDetail(props) {
  const { t } = useTranslation();
  const router = useRouter();

  const sendMailHandler = (event) => {
    event.preventDefault();
    router.push(
      `/mail/new-mail?mailto=${props.courseData.abbreviation}@my-university.de`
    );
  };

  return (
    <section className={classes["course-detail"]}>
      <div className={classes.inline}>
        <h1>
          {props.courseData.course} ({props.courseData.abbreviation})
        </h1>
        <button onClick={sendMailHandler}>{t("courses.send_mail")}</button>
      </div>
      <h3>
        {t("courses.lecturer")}: {props.courseData.professor}
      </h3>
      <p>
        {t("courses.enrolled")}: {props.courseData.currentPeople}/
        {props.courseData.maxPeople}
      </p>
    </section>
  );
}
