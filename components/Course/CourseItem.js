import Link from "next/link";

import { useTranslation } from "react-i18next";

import classes from "./CourseItem.module.css";

export function CourseItem(props) {
  const { t } = useTranslation();

  return (
    <li className={classes.single}>
      <div>
        <h3>
          <Link href={`/course/${props.abbreviation}`}>
            <a
              id={`course_${props.abbreviation}`}
            >{`${props.course} (${props.abbreviation})`}</a>
          </Link>
        </h3>
        <div className={classes.description}>{props.professor}</div>
        <div className={classes.description}>
          {props.currentPeople}/{props.maxPeople} {t("courses.people")}
        </div>
      </div>
    </li>
  );
}
