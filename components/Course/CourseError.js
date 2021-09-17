import { useTranslation } from "react-i18next";

import classes from "./CourseError.module.css";

export default function CourseError(props) {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t("courses.error")}</h1>
      <p>
        {t("courses.course")} '{props.abbreviation}' {t("courses.not_found")}!
      </p>
    </section>
  );
}
