import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logout as authLogout } from '../../utils/auth';
import { CurrentUser } from '../../models/user';
import { Header } from '../shared';

const RootLayout = () => {
  const token = useLoaderData() as CurrentUser;
  const navigate = useNavigate();

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
      <Header />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default RootLayout;
