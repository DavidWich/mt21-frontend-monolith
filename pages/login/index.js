import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Login from "../../components/Auth/Login";

export default function LoginPage() {
  const router = useRouter();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!rendered) {
      setRendered(true);
    } else if (isAuth) {
      router.replace("/");
    }
  }, [rendered, isAuth]);

  if (isAuth) {
    return null;
  }

  return <Login />;
}
