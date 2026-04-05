import TuitionListingsSection from '@/components/layout/tuition/TuitionListingsSection';
import {tuitionDemoData} from '@/pages/Tuition/tuitionDemoData';

const Tuition = () => {
  return <TuitionListingsSection tuitions={tuitionDemoData} />;
};

export default Tuition;
