import PageBreadcrumb from '@/components/layout/dashboard/shared/PageBreadcrumb';
import UserMetaCard from '@/components/layout/dashboard/profile/UserMetaCard';
import UserInfoCard from '@/components/layout/dashboard/profile/UserInfoCard';
import UserAddressCard from '@/components/layout/dashboard/profile/UserAddressCard';
import PageMeta from '@/components/common/PageMeta';

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
          {/* Will change later */}
          <UserMetaCard />
          {/* working on */}
          <UserInfoCard />

          <UserAddressCard />
        </div>
      </div>
    </>
  );
}
