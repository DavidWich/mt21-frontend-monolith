import { useTranslation } from "react-i18next";

import classes from "./Dashboard.module.css";
import Card from "../UI/Card";
import BibDashboardTile from "../Bib/BibDashboardTile";
import CourseDashboardTile from "../Course/CourseDashboardTile";
import MailDashboardTile from "../Mail/MailDashboardTile";
import NewsDashboardTile from "../News/NewsDashboardTile";

export default function Dashboard(props) {
  const { t } = useTranslation();

  return (
    <section className={classes.dashboard}>
      <h1>{t("dashboard.title")}</h1>
      <div className={classes.side}>
        <Card styles={classes.single}>
          <NewsDashboardTile news={props.news} />
        </Card>
        <Card styles={classes.single}>
          <CourseDashboardTile courses={props.courses} />
        </Card>
      </div>
      <div className={classes.side}>
        <Card styles={classes.single}>
          <MailDashboardTile mailCount={props.mails.length} />
        </Card>
        <Card styles={classes.single}>
          <BibDashboardTile books={props.books} />
        </Card>
      </div>
    </section>
  );
}
