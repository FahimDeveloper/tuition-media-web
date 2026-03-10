import BecomeTutor from '../../components/layout/BecomeTutor';
import FeaturedTeacher from '../../components/layout/featuredTeacher/FeaturedTeacher';
import Hero from '../../components/layout/Hero';
import TuitionCategory from '../../components/layout/TuitionCategory';

const Home = () => {
  return (
    <div>
      <Hero />
      <TuitionCategory />
      <BecomeTutor />
      <FeaturedTeacher />
    </div>
  );
};

export default Home;
