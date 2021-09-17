import { useRouter } from "next/router";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import classes from "./Login.module.css";
import { authActions } from "../../store/auth-slice";
import loginAndFetchCourses from "../../assets/functions/loginAndFetchCourses";
import { useCookies } from "react-cookie";

export default function Login() {
  const { t } = useTranslation();
  const [cookies, setCookie] = useCookies(["user"]);
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();

  const loginHandler = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    loginAndFetchCourses(
      email,
      password,
      () => router.replace("/"),
      (token, courses) => {
        setCookie("token", token);
        setCookie("email", email);
        setCookie("courses", courses);
        dispatch(
          authActions.login({
            token: token,
            email: email,
            courses: courses,
          })
        );
      }
    );
  };

  return (
    <form className={classes.auth} onSubmit={loginHandler}>
      <div className={classes.control}>
        <label htmlFor="email">{t("auth.email")}</label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          defaultValue="test@test.com"
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="password">{t("auth.password")}</label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          defaultValue="12345678"
        />
      </div>
      <button id="auth_login">{t("auth.login")}</button>
    </form>
  );
}
