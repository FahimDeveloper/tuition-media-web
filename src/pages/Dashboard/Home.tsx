import ProfileSummary from '@/components/layout/dashboard/home/ProfileSummary';
import Stats from '@/components/layout/dashboard/home/Stats';
import PageMeta from '@/components/common/PageMeta';
import WelcomeMessage from '@/components/layout/dashboard/home/WelcomeMessage';
import ProfileComplete from '@/components/layout/dashboard/home/ProfileComplete';
import StatusStatsCards from '@/components/layout/dashboard/home/StatusStatsCards';

export default function Home() {
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
          <ProfileComplete />
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
