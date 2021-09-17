import Image from "next/image";
import { useTranslation } from "react-i18next";

import classes from "./Welcome.module.css";

export default function Welcome() {
  const { t } = useTranslation();

  const initialize = async () => {
    await fetch("/api/initialize");
    alert("Data initialized");
  };

  return (
    <>
      <section className={classes.welcome}>
        <h1 className={classes.welcome}>{t("welcome.welcome")}!</h1>
        <button onClick={initialize}>{t("welcome.init")}</button>
        <Image
          src={"/img.webp"}
          width="900px"
          height="600px"
          alt="Welcome picture"
        />
        <div style={{ height: "100vh", width: "100px" }} />
        <Image
          src={"/img2.webp"}
          width="900px"
          height="300px"
          alt="Welcome picture 2"
        />
      </section>
    </>
  );
}
