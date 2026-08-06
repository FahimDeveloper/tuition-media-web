import { Outlet } from "react-router-dom";
import { ScrollToTop } from "@/components/common/ScrollToTop";

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default RootLayout;
