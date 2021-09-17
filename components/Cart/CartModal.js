import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import classes from "./CartModal.module.css";
import Modal from "../UI/Modal";
import { useEffect, useState } from "react";

export default function CartModal(props) {
  const { t } = useTranslation();
  const items = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.auth.token);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch("/api/books", {
        method: "POST",
        body: JSON.stringify({ token, items }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setBooks([...data.books]);
    };
    fetchItems();
  }, [items]);

  if (items.length === 0) {
    return (
      <Modal onClose={props.onClose}>
        <h3>{t("cart.cart_is_empty")}.</h3>
      </Modal>
    );
  }

  return (
    <Modal onClose={props.onClose}>
      <ul className={classes.list}>
        {books.map((item) => (
          <li key={item._id}>
            <h3>{`${item.title} (${item.year})`}</h3>
            <div>{item.author}</div>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
