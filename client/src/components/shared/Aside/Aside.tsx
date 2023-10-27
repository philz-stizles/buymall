import { IoHelpCircleOutline, IoMenuOutline } from "react-icons/io5";
import {
  MdOutlineCategory,
  MdOutlineDashboard,
  MdOutlineLogout,
  MdOutlineSettings,
  MdPeopleOutline,
  MdPieChartOutlined,
} from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import MenuTree from "../../ui/MenuTree";
import { useLocation, useNavigate } from "react-router-dom";
import UserMenu from "../../ui/UserMenu";
import { logout } from "../../../utils/auth";

const mainMenus = [
  {
    title: "Overview",
    icon: MdOutlineDashboard,
    to: "/",
  },
  {
    title: "Categories",
    icon: MdOutlineCategory,
    to: "/categories",
  },
  {
    title: "Sub Categories",
    icon: MdOutlineCategory,
    to: "/sub-categories",
  },
  {
    title: "Products",
    icon: FaProductHunt,
    to: "/products",
    children: [
      // {
      //   title: "Create Product",
      //   children: [
      //     { title: "New" },
      //     { title: "Edit" }
      //   ],
      // },
      // { title: "Product List" },
    ],
  },
  {
    title: "Coupons",
    icon: MdOutlineCategory,
    to: "/coupons",
  },
];

const menus = [
  {
    title: "Orders",
    icon: IoMenuOutline,
    to: "/orders",
    children: [],
  },
  {
    title: "Users",
    icon: MdPeopleOutline,
    to: "/users",
    children: [],
  },
  {
    title: "Invoices",
    icon: IoMenuOutline,
    to: "/invoices",
    children: [],
  },
];

const otherMenus = [
  {
    title: "Help Center",
    icon: IoHelpCircleOutline,
    to: "/help-center",
    children: [],
  },
  {
    title: "Settings",
    icon: MdOutlineSettings,
    to: "/settings",
    children: [],
  },
];

const Aside = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <aside className="fixed left-0 top-0 bottom-0 p-6 w-64 max-h-screen bg-white flex flex-col overflow-y-auto">
      <h2 className="flex items-center gap-1 font-semibold mb-8">
        <MdPieChartOutlined size={20} className="text-indigo-500" />{" "}
        <span>BuyMall</span>
      </h2>
      <div className="flex-1">
        <div className="mb-6">
          <h6 className="text-xs uppercase text-slate-400 mb-3 pl-3">
            Main Menu
          </h6>
          <MenuTree data={mainMenus} pathname={pathname} />
        </div>
        <div className="mb-6">
          <h6 className="text-xs uppercase text-slate-400 mb-3 pl-3">
            Business
          </h6>
          <MenuTree data={menus} pathname={pathname} />
        </div>
        <div className="mb-6">
          <h6 className="text-xs uppercase text-slate-400 mb-3 pl-3">Other</h6>
          <MenuTree data={otherMenus} pathname={pathname} />
        </div>
      </div>
      <div className="flex items-center gap-2 border-t pt-3">
        <UserMenu />
        <button
          className="cursor-pointer"
          onClick={() => {
            logout();
            navigate("/auth", { replace: true });
          }}
        >
          <MdOutlineLogout />
        </button>
      </div>
    </aside>
  );
};

export default Aside;
