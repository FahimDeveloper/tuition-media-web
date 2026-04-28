import PageBreadcrumb from '@/components/layout/shared/PageBreadcrumb';
import UserMetaCard from '@/components/layout/tutor/profile/UserMetaCard';
import PersonalInfoSection from '@/components/layout/tutor/profile/personal/PersonalInfoSection';
import TuitionPreferenceSection from '@/components/layout/tutor/profile/tuition/TuitionPreferenceSection';
import PageMeta from '@/components/common/PageMeta';
import EducationInfoSection from '@/components/layout/tutor/profile/education/EducationInfoSection';
import EmergencyContactSection from '@/components/layout/tutor/profile/emergencyContact/EmergencyContactSection';

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

          <EmergencyContactSection />

          <TuitionPreferenceSection />

          <EducationInfoSection />
        </div>
      </div>
    </>
  );
}
