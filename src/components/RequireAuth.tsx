import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const RequireAuth = () => {
  const location = useLocation();
  const selectedAccount = Cookies.get("selectedAccount");
  const currentTokenCookie = Cookies.get("token");
  const token =
    currentTokenCookie && selectedAccount
      ? JSON.parse(currentTokenCookie)[parseInt(selectedAccount)]
      : null;

  const currentUsernameCookie = Cookies.get("username");
  const cookieUsername =
    currentUsernameCookie && selectedAccount
      ? JSON.parse(currentUsernameCookie)[parseInt(selectedAccount)]
      : null;
  // const profileUsername = username ? `${username}` : cookieUsername;
  const profileUsername = cookieUsername;
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
