import TuitionListingsSection from '@/components/layout/tuition/TuitionListingsSection';
import {tuitionMockListings} from '@/mocks/tuition/tuitionListings';

const Tuition = () => {
  return <TuitionListingsSection tuitions={tuitionMockListings} />;
};

export default Tuition;
