import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

import classes from "./BibItem.module.css";

export function BibItem(props) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [added, setAdded] = useState();

  useEffect(() => {
    setAdded(items.includes(props.id));
  }, [items]);

  const onAdd = (event) => {
    event.preventDefault();
    if (added) {
      dispatch(cartActions.removeItem({ id: props.id }));
    } else {
      dispatch(cartActions.addItem({ id: props.id }));
    }
  };

  return (
    <li className={classes.single}>
      <div>
        <div className={classes.side}>
          <h3>
            {props.title} ({props.year})
          </h3>
          <button onClick={onAdd}>{added ? "✓" : "+"}</button>
        </div>
        <div className={classes.description}>{props.author}</div>
        <div className={classes.description}>{props.isbn}</div>
      </div>
    </li>
  );
}
