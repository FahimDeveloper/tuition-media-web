import {MdOutlineManageSearch} from 'react-icons/md';
import type {TuitionData} from '@/mocks/tuition/tuitionListings';
import TuitionCard from '@/components/layout/tuition/TuitionCard';
import TuitionSearchBar from './TuitionSearchBar';

type TuitionListingsSectionProps = {
  tuitions: TuitionData[];
};

const TuitionListingsSection = ({tuitions}: TuitionListingsSectionProps) => {
  const totalResults = tuitions.length;

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-brand-50 via-page to-page py-20 transition-colors duration-300 dark:from-surface-strong dark:via-page dark:to-page sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-[radial-gradient(circle_at_top_left,rgba(102,153,207,0.22),transparent_50%),radial-gradient(circle_at_top_right,rgba(63,114,175,0.16),transparent_45%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-surface-elevated/82 px-3 py-1 text-sm font-medium text-text-strong shadow-theme-xs backdrop-blur">
              <MdOutlineManageSearch className="text-lg text-primary dark:text-brand-300" />
              {totalResults} tuition{' '}
              {totalResults === 1 ? 'listing' : 'listings'} available
            </p>
          </div>
        </div>

        {/* Search / Filter Panel */}
        <TuitionSearchBar />

        {/* Listings */}
        <div className="mt-12">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tuitions.map((tuition) => (
              <TuitionCard key={tuition.id} tuition={tuition} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TuitionListingsSection;
