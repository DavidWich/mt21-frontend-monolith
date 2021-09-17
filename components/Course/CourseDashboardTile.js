import Link from "next/link";
import { useTranslation } from "react-i18next";

import classes from "./CourseDashboardTile.module.css";

export default function CourseDashboardTile(props) {
  const { t } = useTranslation();

  return (
    <div className={classes.dashboard}>
      <Link href="/news">
        <h2>{t("dashboard.courses")}</h2>
      </Link>
      <ul className={classes["dashboard-items"]}>
        {props.courses.map((item) => (
          <li key={item.id}>
            <Link href={`/course/${item.abbreviation}`}>{item.course}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
