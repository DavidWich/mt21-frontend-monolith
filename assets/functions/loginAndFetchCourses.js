export default async function loginAndFetchCourses(
  email,
  password,
  redirect,
  login
) {
  fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE}/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "CONTENT-TYPE": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const errorMessage =
            (data && data.error && data.error.message) ||
            "Authentication failed!";
          throw new Error(errorMessage);
        });
      }
    })
    .then(async (token) => {
      const courses = await fetchUserCourses(email, token);
      login(token, courses.courses);
      redirect();
    })
    .catch((err) => alert(err));
}

const fetchUserCourses = async (email, token) => {
  return await fetch("/api/courses", {
    method: "POST",
    body: JSON.stringify({ email, token }),
    headers: { "CONTENT-TYPE": "application/json" },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error fetching individual course data");
    }
  });
};
