import { Outlet } from "react-router-dom";
import Header from "@/components/layout/header/MainHeader";
import Footer from "@/components/layout/footer/Footer";

const MainLayout = () => {
  return (
    <div className="bg-surface text-text-strong min-h-screen transition-colors duration-300">
      <Header />
      <main className="bg-surface transition-colors duration-300">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
