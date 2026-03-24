import {FiBriefcase, FiLayout, FiSearch} from 'react-icons/fi';
import type {TuitionData} from '../../../pages/Tuition/tuitionDemoData';
import TuitionCard from './TuitionCard';

type TuitionListingsSectionProps = {
  tuitions: TuitionData[];
};

const TuitionListingsSection = ({tuitions}: TuitionListingsSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-brand-50 via-surface to-surface py-24 sm:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(102,153,207,0.22),_transparent_50%),radial-gradient(circle_at_top_right,_rgba(63,114,175,0.16),_transparent_45%)]"
        aria-hidden="true"
      />

      <div></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {tuitions.map((tuition) => (
            <TuitionCard key={tuition.id} tuition={tuition} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TuitionListingsSection;
