import Link from "next/link";
import { useTranslation } from "react-i18next";

import classes from "./MailDashboardTile.module.css";

export default function MailDashboardTile(props) {
  const { t } = useTranslation();

  return (
    <div className={classes.dashboard}>
      <Link href="/news">
        <h2>{t("dashboard.mails")}</h2>
      </Link>
      {`${t("dashboard.mail_count")}: ${props.mailCount}`}
    </div>
  );
}
