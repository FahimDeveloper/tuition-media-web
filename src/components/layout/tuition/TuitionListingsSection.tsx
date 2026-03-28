import Input from 'antd/es/input/Input';
import type {TuitionData} from '../../../pages/Tuition/tuitionDemoData';
import TuitionCard from './TuitionCard';
import {Button} from 'antd';
import {MdOutlineManageSearch} from 'react-icons/md';

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <p className="flex items-center gap-1">
            <MdOutlineManageSearch className="text-2xl text-primary" />
            <span>100 results found</span>
          </p>
          <Button type="primary">Filter Button</Button>
        </div>
        <div className="grid grid-cols-[3fr_2fr_1fr] gap-4">
          {/* Address */}
          <Input placeholder="Basic usage" />
          {/* Range */}
          <Input placeholder="Basic usage" />
          {/* Search Button */}
          <Button type="primary">Search</Button>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tuitions.map((tuition) => (
            <TuitionCard key={tuition.id} tuition={tuition} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TuitionListingsSection;
