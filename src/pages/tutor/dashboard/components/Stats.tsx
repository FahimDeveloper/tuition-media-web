import type { DashboardStatCardProps } from "@/pages/tutor/dashboard/components/DashboardStatCard";
import DashboardStatCard from "@/pages/tutor/dashboard/components/DashboardStatCard";
import { IoLocationSharp, IoPulseSharp } from "react-icons/io5";

type DashboardHomeStat = Omit<DashboardStatCardProps, "className"> & {
  id: string;
};

const dashboardHomeStats: DashboardHomeStat = {
  id: "area-jobs",
  value: 5,
  description: "5 tuition jobs are available in your tutoring area right now.",
  icon: <IoLocationSharp />,
  action: {
    label: "View Jobs",
    to: "/tutor/job-board",
  },
};

export default function Stats() {
  return (
    <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:auto-rows-fr xl:grid-cols-1">
      <DashboardStatCard {...dashboardHomeStats} />
      {/* I need a notice board here. tha should have a seminar look */}
      <DashboardStatCard {...dashboardHomeStats} />
    </div>
  );
}
