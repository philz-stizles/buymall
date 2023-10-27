import {
  Outlet,
  useLoaderData,
  // useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { logout as authLogout } from '../../utils/auth';
import { CurrentUser } from '../../models/user';
import { useAuth } from '../../context';
import { Header } from '../shared';

const RootLayout = () => {
  const token = useLoaderData() as CurrentUser;
  const navigate = useNavigate();
  const { login, logout: contextLogout } = useAuth(); // 14
  // const location = useLocation();

  useEffect(() => {
    console.log(token);
    let timer: number;
    if (token) {
      login(token.user);
      timer = setTimeout(() => {
        authLogout();
        contextLogout();
        // navigate('/signup', { replace: true });
      }, token.duration);
      return;
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [contextLogout, login, navigate, token]);

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
