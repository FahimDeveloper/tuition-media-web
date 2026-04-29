import BecomeTutor from '@/components/layout/home/BecomeTutor';
import FeaturedTeacher from '@/components/layout/home/featuredTeacher/FeaturedTeacher';
import Hero from '@/components/layout/home/Hero';
import LookingForATeacherCta from '@/components/layout/home/LookingForATeacherCta';
import TuitionCategory from '@/components/layout/home/TuitionCategory';

const Home = () => {
  return (
    <div>
      <Hero />
      <TuitionCategory />
      <BecomeTutor />
      <FeaturedTeacher />
      <LookingForATeacherCta />
    </div>
  );
};

export default Home;
