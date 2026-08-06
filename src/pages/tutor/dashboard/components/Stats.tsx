import type { DashboardStatCardProps } from "@/pages/tutor/dashboard/components/DashboardStatCard";
import DashboardStatCard from "@/pages/tutor/dashboard/components/DashboardStatCard";
import { IoLocationSharp } from "react-icons/io5";
import NoticeBoard, {
  type NoticeItem,
} from "@/pages/tutor/dashboard/components/NoticeBoard";

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

const notices: NoticeItem[] = [
  {
    id: 1,
    title: "System maintenance scheduled",
    description:
      "The portal will be unavailable on Friday from 10 PM to 12 AM.",
    date: "Today",
    to: "/notices/1",
  },
  {
    id: 2,
    title: "New admission form released",
    description: "Students can now submit admission forms online.",
    date: "May 15",
  },
];

export default function Stats() {
  return (
    <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:auto-rows-fr xl:grid-cols-1">
      <DashboardStatCard {...dashboardHomeStats} />

      <NoticeBoard notices={notices} />
    </div>
  );
}
