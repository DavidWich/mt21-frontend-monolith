import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import classes from "./NewsDashboardTile.module.css";

export default function NewsDashboardTile(props) {
  const { t } = useTranslation();
  const courses = useSelector((state) => state.auth.courses);
  const filteredNews = props.news.filter(
    (item) => item.course === "ALL" || courses.includes(item.course)
  );

  return (
    <div className={classes.dashboard}>
      <Link href="/news">
        <h2>{t("dashboard.news")}</h2>
      </Link>
      <ul className={classes["dashboard-items"]}>
        {filteredNews.map((item) => (
          <li key={item.id}>
            <Link href="/news">{item.title}</Link>
            <div className={classes["item-date"]}>{item.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
