import type { ReactNode } from "react";
import { useAppSelector } from "../hooks/useAppHooks";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }: { children: ReactNode }) => {
  const { user, accessToken } = useAppSelector((state) => state.auth);
  if (user && accessToken) {
    return <Navigate to={`/${user?.role}/dashboard`} />;
  } else {
    return children;
  }
};

export default ProtectRoute;
