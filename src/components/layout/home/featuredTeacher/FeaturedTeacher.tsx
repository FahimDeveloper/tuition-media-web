import FeaturedTeacherCarousel from '@/components/layout/home/featuredTeacher/FeaturedTeacherCarousel';

const FeaturedTeacher = () => {
  return (
    <section className="bg-surface py-20 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="font-poppins text-sm font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-300">
            Featured Teachers
          </span>
          <h2 className="mt-4 font-poppins text-3xl font-extrabold leading-tight text-text-strong sm:text-4xl md:text-5xl">
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
