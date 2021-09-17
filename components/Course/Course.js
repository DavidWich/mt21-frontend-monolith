import classes from "./Course.module.css";
import Card from "../UI/Card";
import { CourseItem } from "./CourseItem";
import { useTranslation } from "react-i18next";

export default function Course(props) {
  const { t } = useTranslation();

  return (
    <section className={classes.course}>
      <h1>{t("courses.courses")}</h1>
      <Card>
        <ul>
          {props.courses.map((item) => (
            <CourseItem
              key={item.id}
              course={item.course}
              abbreviation={item.abbreviation}
              professor={item.professor}
              currentPeople={item.currentPeople}
              maxPeople={item.maxPeople}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}
