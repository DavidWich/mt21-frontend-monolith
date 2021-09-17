import { useTranslation } from "react-i18next";

import classes from "./Bib.module.css";
import Card from "../UI/Card";
import { BibItem } from "./BibItem";

export default function Bib(props) {
  const { t } = useTranslation();

  return (
    <section className={classes.bib}>
      <h1>{t("bib.library")}</h1>
      <Card>
        <ul>
          {props.books.map((item) => (
            <BibItem
              key={item.id}
              id={item.id}
              title={item.title}
              author={item.author}
              year={item.year}
              isbn={item.isbn}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}
