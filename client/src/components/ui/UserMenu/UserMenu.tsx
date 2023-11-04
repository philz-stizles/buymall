import { useLoaderData } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import { CurrentUser } from '../../../models/user';

const UserMenu = () => {
  const { user } = useLoaderData() as CurrentUser;
  return (
    <div className="flex items-center gap-3">
      <Avatar />
      <div className="overflow-hidden">
        <div className="text-sm font-normal overflow-hidden text-ellipsis whitespace-nowrap">{`${user?.firstName} ${user?.lastName}`}</div>
        <div className="text-xs text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap">
          {user?.email}
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
