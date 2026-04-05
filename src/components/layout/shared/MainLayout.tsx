import {Outlet} from 'react-router-dom';
import Header from '@/components/layout/shared/Header';
import Footer from '@/components/layout/shared/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-surface text-text-strong transition-colors duration-300">
      <Header />
      <main className="bg-surface transition-colors duration-300">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
