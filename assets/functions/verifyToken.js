export default async function verifyToken(token) {
  return await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE}/isAuth`, {
    method: "POST",
    body: JSON.stringify({ token: token }),
    headers: { "CONTENT-TYPE": "application/json" },
  })
    .then((res) => {
      return res.status;
    })
    .catch(() => {
      return 404;
    });
}
