import FeaturedTeacherCarousel from "@/components/layout/home/featuredTeacher/FeaturedTeacherCarousel";

const FeaturedTeacher = () => {
  return (
    <section className="bg-surface py-20 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="font-poppins text-brand-600 dark:text-brand-300 text-sm font-semibold tracking-[0.14em] uppercase">
            Featured Teachers
          </span>
          <h2 className="font-poppins text-text-strong mt-4 text-3xl leading-tight font-extrabold sm:text-4xl md:text-5xl">
            We arrange best tutor for your success.
          </h2>
        </div>

        <div className="mt-8">
          <FeaturedTeacherCarousel />
        </div>
      </div>
    </section>
  );
};

export default FeaturedTeacher;
