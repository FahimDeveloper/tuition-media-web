import BecomeTutor from "@/pages/home/become_a_tutor_section/BecomeTutor";
import Hero from "@/pages/home/hero_section/Hero";
import LookingForATeacherCta from "@/pages/home/looking_fort_a_teacher_cta_section/LookingForATeacherCta";
import TuitionCategory from "@/pages/home/tuition_category_section/TuitionCategory";
import WhyChooseUsSection from "./why_choose_us_section/whyChooseUsSection";

const Home = () => {
  return (
    <div>
      {/* // TODO: Update the hero section image. */}
      <Hero />

      {/* // TODO: Update the tuition category section. */}
      <TuitionCategory />

      <BecomeTutor />
      <WhyChooseUsSection />
      <LookingForATeacherCta />
    </div>
  );
};

export default Home;
