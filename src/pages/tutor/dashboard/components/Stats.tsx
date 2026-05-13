import type { DashboardStatCardProps } from "@/components/layout/stats/DashboardStatCard";
import DashboardStatCard from "@/components/layout/stats/DashboardStatCard";
import { IoLocationSharp, IoPulseSharp } from "react-icons/io5";

type DashboardHomeStat = Omit<DashboardStatCardProps, "className"> & {
  id: string;
};

const dashboardHomeStats: DashboardHomeStat[] = [
  {
    id: "area-jobs",
    value: 5,
    description:
      "5 tuition jobs are available in your tutoring area right now.",
    icon: <IoLocationSharp />,
    action: {
      label: "View Jobs",
      to: "/tutor/job-board",
    },
  },
  {
    id: "subject-matches",
    value: 12,
    description:
      "12 tuition opportunities match your preferred subjects and availability.",
    icon: <IoPulseSharp />,
    action: {
      label: "Browse Matches",
      to: "/tuition",
    },
  },
];

export default function Stats() {
  return (
    <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:auto-rows-fr xl:grid-cols-1">
      {dashboardHomeStats.map(({ id, ...stat }) => (
        <DashboardStatCard key={id} {...stat} />
      ))}
    </div>
  );
}
