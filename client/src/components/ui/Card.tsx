import { PropsWithChildren } from "react";

type CardProps = {
    className?: string;
}

const Card = ({ className, children}: PropsWithChildren<CardProps>) => {
  return (
    <div className="">{children}</div>
  );
};
// background: #fff;
//   border-radius: 10px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
export default Card