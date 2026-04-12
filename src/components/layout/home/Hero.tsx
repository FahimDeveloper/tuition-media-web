import {Link} from 'react-router-dom';

const Hero = () => {
  return (
    <section
      id="home"
      className="flex min-h-screen items-center bg-brand-50 pt-16 transition-colors duration-300 dark:bg-gray-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-strong mb-4">
              Find{' '}
              <span className="text-brand-700 dark:text-brand-300">
                Tuition Opportunities
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-text-strong/80 mb-8">
              Built for Tutors Across Bangladesh
            </p>
            <p className="text-text-strong/80 mb-8 leading-relaxed">
              TutoriumBD helps you discover relevant tuition leads, apply
              quickly, and connect with guardians through a simple, trusted
              flow.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/tuition"
                className="rounded-lg bg-brand-600 px-8 py-3 text-text-on-brand shadow-lg transition hover:bg-brand-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-50 dark:focus-visible:ring-offset-gray-950"
              >
                Find Tuition Jobs
              </Link>
              <Link
                to="/signup"
                className="rounded-lg border-2 border-brand-600 px-8 py-3 text-brand-700 transition hover:bg-brand-600 hover:text-text-on-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-50 dark:border-brand-400 dark:text-brand-300 dark:hover:bg-brand-500 dark:hover:text-white dark:focus-visible:ring-offset-gray-950"
              >
                Join as a Tutor
              </Link>
            </div>
          </div>
          <div className="flex justify-center fade-in">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-brand-700 to-brand-500 rounded-full shadow-2xl flex items-center justify-center">
                <div className="flex h-60 w-60 items-center justify-center rounded-full bg-white text-8xl shadow-[0_16px_40px_rgba(17,45,78,0.14)] dark:bg-white/[0.05] dark:shadow-[0_18px_44px_rgba(3,7,18,0.36)] md:h-72 md:w-72 lg:h-88 lg:w-88">
                  <img
                    src="/call-center-illustration.jpg"
                    className="object-cover w-full h-full rounded-full"
                    alt=""
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-700 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-brand-500 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
