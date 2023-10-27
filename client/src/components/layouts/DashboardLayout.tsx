import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { Aside, Drawer, Toolbar } from "./../shared";
import { useEffect } from "react";
import { logout as authLogout } from "../../utils/auth";
import { CurrentUser } from "../../models/user";
import { useModalContext } from "../../context/modal-context";
import { useAuth, useDrawerContext } from "../../context";

const DashboardLayout = () => {
  const token = useLoaderData() as CurrentUser;
  const navigate = useNavigate();
  const { login, logout: contextLogout } = useAuth(); // 14
  const { isShowing } = useDrawerContext();
  const location = useLocation();
  const { closeModal } = useModalContext();

  console.log(location);
  
  useEffect(() => {
    closeModal();
    console.log(location);
  }, [closeModal, location]);

  useEffect(() => {
    console.log(token);
    let timer: number;
    if (token) {
      login(token.user);
      timer = setTimeout(() => {
        authLogout();
        contextLogout();
        navigate("/auth", { replace: true });
      }, token.duration);
      return;
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [contextLogout, login, navigate, token]);

  return (
    <>
      <Aside />
      <Toolbar />
      <main className="min-h-screen flex flex-col overflow-y-auto bg-slate-100 ml-64 px-10 pb-10 pt-16">
        <Outlet />
      </main>
      {isShowing && <Drawer />}
    </>
  );
};

export default DashboardLayout;
