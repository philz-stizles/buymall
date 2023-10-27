import { useAuth } from "../../context";
import Avatar from "./Avatar"

const UserMenu = () => {
  const { user } = useAuth()
  return (
    <div className="flex items-center gap-3">
      <Avatar />
      <div className="overflow-hidden">
        <div className="text-sm font-normal overflow-hidden text-ellipsis whitespace-nowrap">{`${user?.firstname} ${user?.lastname}`}</div>
        <div className="text-xs text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap">
          {user?.email}
        </div>
      </div>
    </div>
  );
}

export default UserMenu