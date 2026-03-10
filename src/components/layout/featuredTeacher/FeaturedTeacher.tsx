import FeaturedTeacherCarousel from './FeaturedTeacherCarousel';

const FeaturedTeacher = () => {
  return (
    <section className="bg-surface py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="font-poppins text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">
            Featured Teachers
          </span>
          <h2 className="mt-4 font-poppins text-3xl font-extrabold leading-tight text-text-strong sm:text-4xl md:text-5xl">
            Learn from trusted tutors with proven classroom experience
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-strong/80 sm:text-lg">
            Discover top-rated tutors across subjects, compare strengths in one
            place, and connect with the right educator for your learning goals.
          </p>
        </div>

        <div className="mt-10 sm:mt-12">
          <FeaturedTeacherCarousel />
        </div>
      </div>
    </section>
  );
};

export default FeaturedTeacher;
