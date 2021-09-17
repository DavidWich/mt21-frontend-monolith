import { useRouter } from "next/router";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import classes from "./NewMail.module.css";

export default function NewMail() {
  const { t } = useTranslation();
  const router = useRouter();
  const recipientRef = useRef();
  const subjectRef = useRef();
  const contentRef = useRef();
  const sender = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);

  const { mailto } = router.query;

  const backHandler = (event) => {
    event.preventDefault();
    router.replace("/mail");
  };
  const newEmailHandler = async (event) => {
    event.preventDefault();

    await fetch("/api/new-email", {
      method: "POST",
      body: JSON.stringify({
        sender: sender,
        recipient: recipientRef.current.value,
        subject: subjectRef.current.value,
        content: contentRef.current.value,
        token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.replace("/mail");
  };

  return (
    <section>
      <form className={classes["new-mail"]} onSubmit={newEmailHandler}>
        <div className={classes.side}>
          <button onClick={backHandler}>{t("mail.back")}</button>
          <button>{t("mail.send")}</button>
        </div>
        <div className={classes.control}>
          <label htmlFor="recipient">{t("mail.recipient")}</label>
          <input
            type="email"
            id="recipient"
            ref={recipientRef}
            defaultValue={mailto}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="subject">{t("mail.subject")}</label>
          <input type="text" id="subject" ref={subjectRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="content">{t("mail.content")}</label>
          <textarea rows="20" id="content" ref={contentRef} />
        </div>
      </form>
    </section>
  );
}
