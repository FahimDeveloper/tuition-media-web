import PageBreadcrumb from '@/components/layout/dashboard/shared/PageBreadcrumb';
import UserMetaCard from '@/components/layout/dashboard/profile/UserMetaCard';
import PersonalInfoSection from '@/components/layout/dashboard/profile/PersonalInfoSection';
import TuitionPreferenceSection from '@/components/layout/dashboard/profile/TuitionPreferenceSection';
import PageMeta from '@/components/common/PageMeta';
import EducationInfoSection from '@/components/layout/dashboard/profile/education/EducationInfoSection';

export default function UserProfiles() {
  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="rounded-2xl border border-border bg-surface-elevated p-5 lg:p-6">
        <PageBreadcrumb pageTitle="Profile" />
        <div className="space-y-6">
          <UserMetaCard />

          <PersonalInfoSection />

          <TuitionPreferenceSection />

          <EducationInfoSection />
        </div>
      </div>
    </>
  );
}
