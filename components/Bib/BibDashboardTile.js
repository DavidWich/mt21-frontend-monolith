import Link from "next/link";
import { useTranslation } from "react-i18next";

import classes from "./BibDashboardTile.module.css";

export default function BibDashboardTile(props) {
  const { t } = useTranslation();

  return (
    <div className={classes.dashboard}>
      <Link href="/bib">
        <h2>{t("dashboard.bib")}</h2>
      </Link>
      <ul className={classes["dashboard-items"]}>
        {props.books.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
