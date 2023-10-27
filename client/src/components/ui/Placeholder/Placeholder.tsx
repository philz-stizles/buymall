import classes from "./Placeholder.module.css";

type Props = {
  width?: string;
  height?: string;
};

const Placeholder = ({ width, height}: Props) => {
  return (
    <div className={classes.placeholder}>
      <div className={classes.placeholder__title}>
        <div
          className={`${classes.placeholder__skeleton} ${classes.shimmer}`}
        ></div>
      </div>
      <div className={classes.placeholder__description}>
        <div className={classes.placeholder__skeleton}></div>
      </div>
    </div>
  );
};

export default Placeholder;
