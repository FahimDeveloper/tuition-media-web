import BecomeTutor from '../../components/layout/home/BecomeTutor';
import FeaturedTeacher from '../../components/layout/home/featuredTeacher/FeaturedTeacher';
import Hero from '../../components/layout/home/Hero';
import TuitionCategory from '../../components/layout/home/TuitionCategory';

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
