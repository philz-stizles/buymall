import { MdOutlineEmail, MdOutlineNotifications, MdPieChartOutlined } from "react-icons/md"
import { IoMdHelpCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const Toolbar = () => {
  return (
    <div className="h-16 px-8 fixed top-0 left-0 right-0 flex justify-end items-center z-40">
      
      <div className="flex items-center gap-4 font-semibold">
        <MdOutlineEmail size={22} />
        <MdOutlineNotifications size={22} />
        <IoMdHelpCircleOutline size={22} />
        {/* <UserMenu /> */}
      </div>
    </div>
  );
}

export default Toolbar