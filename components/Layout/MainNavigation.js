import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import classes from "./MainNavigation.module.css";
import Cart from "../Cart/Cart";
import Dropdown from "../UI/Dropdown";
import { authActions } from "../../store/auth-slice";
import { cartActions } from "../../store/cart-slice";

const MainNavigation = () => {
  const { t, i18n } = useTranslation();
  const [cookies, removeCookie] = useCookies(["user"]);
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = cookies.token;
    const email = cookies.email;
    const courses = cookies.courses;
    if (
      typeof token !== "undefined" &&
      token !== "undefined" &&
      typeof email !== "undefined" &&
      email !== "undefined"
    ) {
      // dispatch(authActions.login({ token, email, courses }));
    }
  }, []);

  const logoutHandler = (event) => {
    event.preventDefault();
    removeCookie("token");
    removeCookie("email");
    removeCookie("courses");
    dispatch(authActions.logout());
    router.push("/");
  };

  const showCartHandler = (event) => {
    event.preventDefault();
    dispatch(cartActions.showCart());
  };

  const languageChangeHandler = (value) => i18n.changeLanguage(value);

  const languages = [
    { value: "en", text: "English" },
    { value: "de", text: "German" },
  ];
  const languageIndex = languages.findIndex((el) => el.value === i18n.language);
  languages[languageIndex].selected = true;

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link className={classes.logo} href="/">
          Studi-App
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/news">
              <a id="nav_news">{t("header.news")}</a>
            </Link>
          </li>
          {isAuth && (
            <li>
              <Link href="/bib">
                <a id="nav_bib">{t("header.bib")}</a>
              </Link>
            </li>
          )}
          {isAuth && (
            <li>
              <Link href="/mail">
                <a id="nav_mail">{t("header.email")}</a>
              </Link>
            </li>
          )}
          {isAuth && (
            <li>
              <Link href="/course">
                <a id="nav_course">{t("header.courses")}</a>
              </Link>
            </li>
          )}
          {!isAuth && (
            <li>
              <Link href="/login">
                <a id="nav_login">{t("header.login")}</a>
              </Link>
            </li>
          )}
          {isAuth && (
            <li>
              <button id="nav_logout" onClick={logoutHandler}>
                {t("header.logout")}
              </button>
            </li>
          )}
          {isAuth && (
            <li>
              <Cart onClick={showCartHandler} />
            </li>
          )}
          <li>
            <Dropdown
              onChangeHandler={languageChangeHandler}
              styling={classes.filter}
              items={languages}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
