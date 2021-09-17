import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./Cart.module.css";
import CartIcon from "./CartIcon";

export default function Cart(props) {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const items = useSelector((state) => state.cart.items);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button id="nav_cart" className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.badge}>{items.length}</span>
    </button>
  );
}
