import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import classes from "./Mail.module.css";
import Card from "../UI/Card";
import { MailItem } from "./MailItem";

export default function Mail(props) {
  const { t } = useTranslation();
  const router = useRouter();

  const newEmailHandler = (event) => {
    event.preventDefault();
    router.push(`${router.pathname}/new-mail`);
  };

  return (
    <section className={classes.mail}>
      <div className={classes.heading}>
        <h1>{t("mail.email")}</h1>
        <button id="mail_new" onClick={newEmailHandler}>
          {t("mail.new_email")}
        </button>
      </div>
      <Card>
        <ul>
          {props.mails.map((item) => (
            <MailItem
              key={item.id}
              sender={item.sender}
              recipient={item.recipient}
              subject={item.subject}
              content={item.content}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}
