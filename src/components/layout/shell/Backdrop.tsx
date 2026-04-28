import { useSidebar } from "@/context/dashboard/SidebarContext";

const Backdrop: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-overlay-strong lg:hidden"
      onClick={toggleMobileSidebar}
    />
  );
};

export default Backdrop;
