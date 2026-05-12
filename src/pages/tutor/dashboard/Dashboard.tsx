import { skipToken } from "@reduxjs/toolkit/query";
import ProfileSummary from "@/pages/tutor/dashboard/components/ProfileSummary";
import Stats from "@/pages/tutor/dashboard/components/Stats";
import PageMeta from "@/components/common/PageMeta";
import WelcomeMessage from "@/pages/tutor/dashboard/components/WelcomeMessage";
import ProfileComplete from "@/pages/tutor/dashboard/components/ProfileComplete";
import StatusStatsCards from "@/pages/tutor/dashboard/components/StatusStatsCards";

import { useAppSelector } from "@/hooks/useAppHooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useTeacherProfileQuery } from "@/redux/features/teachers/teachersProfileApi";
import { calculateTeacherProfileCompletion } from "@/pages/tutor/profile/components/profileCompletion";
import { getUserDisplayName } from "@/utils/userDisplay";

export default function Home() {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: teacherProfile, isLoading } = useTeacherProfileQuery(
    currentUser?._id ?? skipToken,
  );
  const completion = calculateTeacherProfileCompletion(teacherProfile);
  const displayName = getUserDisplayName(teacherProfile ?? currentUser, "your");

  return (
    <>
      <PageMeta
        title="Tutor Dashboard | TutoriumBD"
        description="Track profile progress, review tutor activity, and explore new tuition opportunities from your TutoriumBD dashboard."
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-7">
          <WelcomeMessage />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <ProfileSummary />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <ProfileComplete
            progress={completion}
            name={displayName}
            loading={isLoading}
          />
        </div>

        <div className="col-span-12 h-full xl:col-span-7">
          <Stats />
        </div>
        <div className="col-span-12">
          <StatusStatsCards />
        </div>
      </div>
    </>
  );
}
