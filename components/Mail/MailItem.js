import classes from "./MailItem.module.css";

export function MailItem(props) {
  return (
    <li className={classes.single}>
      <div>
        <h3>{`${props.sender} (to: ${props.recipient})`}</h3>
        <div className={classes.description}>{props.subject}</div>
        <div className={classes.description}>{props.content}</div>
      </div>
    </li>
  );
}
