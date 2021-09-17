import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Layout.module.css";
import CartModal from "../Cart/CartModal";
import MainNavigation from "./MainNavigation";
import { cartActions } from "../../store/cart-slice";

const Layout = (props) => {
  const showCart = useSelector((state) => state.cart.showCart);
  const dispatch = useDispatch();

  const hideCartHandler = (event) => {
    event.preventDefault();
    dispatch(cartActions.hideCart());
  };

  return (
    <>
      <Head>
        <title>Studi-App</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {showCart && <CartModal onClose={hideCartHandler} />}
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </>
  );
};

export default Layout;
