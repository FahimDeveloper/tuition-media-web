import PageMeta from "@/components/common/PageMeta";
import BecomeTutor from "@/pages/home/become-a-tutor-section/BecomeTutor";
import Hero from "@/pages/home/hero-section/Hero";
import LookingForATeacherCta from "@/pages/home/looking-for-teacher-cta-section/LookingForATeacherCta";
import TuitionCategory from "@/pages/home/tuition-category-section/TuitionCategory";
import WhyChooseUsSection from "@/pages/home/why-choose-us-section/WhyChooseUsSection";

const Home = () => {
  return (
    <>
      <PageMeta
        title="Home | TutoriumBD"
        description="Discover tuition opportunities from TutoriumBD."
      />
      <div>
        <Hero />
        <TuitionCategory />
        <BecomeTutor />
        <WhyChooseUsSection />
        <LookingForATeacherCta />
      </div>
    </>
  );
};

export default Home;
