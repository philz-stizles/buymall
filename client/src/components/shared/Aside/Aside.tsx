import {
  MdOutlineLogout,
  MdPieChartOutlined,
} from 'react-icons/md';
import MenuTree from '../../ui/MenuTree/MenuTree';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import UserMenu from '../../ui/UserMenu/UserMenu';
import { logout } from '../../../utils/auth';
import { mainMenus, menus, otherMenus } from './menus';
import { CurrentUser } from '../../../models/user';

const Aside = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useLoaderData() as CurrentUser;

  return (
    <aside className="fixed left-0 top-0 bottom-0 p-6 w-64 max-h-screen bg-white flex flex-col overflow-y-auto">
      <Link to="/" className="flex items-center gap-1 font-semibold mb-8">
        <MdPieChartOutlined size={20} className="text-indigo-500" />{' '}
        <span>BuyMall</span>
      </Link>
      <div className="flex-1">
        <div className="mb-6">
          <h6 className="text-xs uppercase text-slate-400 mb-3 pl-3">
            Main Menu
          </h6>
          <MenuTree data={mainMenus[user.role]} pathname={pathname} />
        </div>
        <div className="mb-6">
          <h6 className="text-xs uppercase text-slate-400 mb-3 pl-3">
            Business
          </h6>
          <MenuTree data={menus[user.role]} pathname={pathname} />
        </div>
        <div className="mb-6">
          <h6 className="text-xs uppercase text-slate-400 mb-3 pl-3">Other</h6>
          {user && (
            <MenuTree data={otherMenus[user.role]} pathname={pathname} />
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 border-t pt-3">
        <UserMenu />
         
        <button
          className="cursor-pointer"
          onClick={() => {
            logout();
            navigate('/', { replace: true });
          }}
        >
          <MdOutlineLogout />
        </button>
      </div>
    </aside>
  );
};

export default Aside;
