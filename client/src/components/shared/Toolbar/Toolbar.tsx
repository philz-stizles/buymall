import { MdOutlineEmail, MdOutlineNotifications, MdPieChartOutlined } from "react-icons/md"
import { IoMdHelpCircleOutline } from "react-icons/io";

const Toolbar = () => {
  return (
    <div className="h-16 px-8 fixed top-0 left-0 right-0 bg-white flex justify-between items-center z-40">
      <h2 className="flex items-center font-semibold">
        <MdPieChartOutlined size={20} className="text-indigo-500" />{" "}
        <span>BuyMall</span>
      </h2>
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