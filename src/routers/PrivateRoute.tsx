import type { ReactNode } from "react";
import { useAppSelector } from "@/hooks/useAppHooks";
import { Navigate } from "react-router-dom";

const PrivetRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string;
}) => {
  const { user, accessToken } = useAppSelector((state) => state.auth);
  if (user && accessToken && role === "tutor") {
    return children;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default PrivetRoute;
