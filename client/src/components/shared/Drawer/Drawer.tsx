import { IoClose, IoSettings } from "react-icons/io5";
import classes from "./Drawer.module.css";
import { Button } from "../../ui";
import EmptyState from "../../ui/EmptyState";

type Props = {
  title?: string;
  body?: React.ReactElement;
  actionLabel?: string;
  action?: () => void;
};
//     max-width: 100%;
//     width: 42rem;
//     height: 100vh;
//     height: 100%;
//     line-height: 1.6rem;
//     box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12);
//     transition: all .3s;

const Drawer = ({ title,  actionLabel, action }: Props) => {
  return (
    <div className="fixed flex flex-col top-0 right-0 bottom-0 bg-white max-w-full w-96 z-[52] overflow-y-auto transition shadow-lg">
      <div className=" bg-[#115DFC] flex justify-between items-center text-white p-2">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <IoSettings size={24} />
          <IoClose size={24} />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center items-center p-6">
        <EmptyState
          title="You don't have any alerts"
          description="You will see notifications from projects you work on appear here"
          image=""
        />
        {actionLabel && action && (
          <Button label={actionLabel} onClick={action} />
        )}
      </div>
      <div className={classes.drawer__footer}></div>
    </div>
  );
};

export default Drawer;
