import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { Aside, Drawer, Toolbar } from '../shared';
import { useEffect } from 'react';
import { logout as authLogout } from '../../utils/auth';
import { CurrentUser } from '../../models/user';
import { useDrawerContext } from '../../context';

const DashboardLayout = () => {
  const token = useLoaderData() as CurrentUser;
  const navigate = useNavigate();
  const { isShowing } = useDrawerContext();

  useEffect(() => {
    if (!token) {
      return;
    }
    
    let timer: NodeJS.Timeout;
    if (token) {
      timer = setTimeout(() => {
        authLogout();
        navigate('/', { replace: true });
      }, token.duration);
      return;
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [navigate, token]);

  return (
    <>
      <Aside />
      <Toolbar />
      <main className="min-h-screen flex flex-col overflow-y-auto bg-slate-50 ml-64 px-10 pb-10 pt-16">
        <Outlet />
      </main>
      {isShowing && <Drawer />}
    </>
  );
};

export default DashboardLayout;
