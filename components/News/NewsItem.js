import Link from "next/link";

import classes from "./NewsItem.module.css";

const parseCourse = (course) =>
  course === "ALL" || course.length === 0 ? (
    ""
  ) : (
    <Link href={`/course/${course}`}>{`[${course}]`}</Link>
  );

export function NewsItem(props) {
  return (
    <li className={classes.single}>
      <div>
        <div className={classes.headline}>
          <h2>{props.title}</h2>
          {parseCourse(props.course)}
        </div>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.author}>
          - {props.author} ({props.date})
        </div>
      </div>
    </li>
  );
}
