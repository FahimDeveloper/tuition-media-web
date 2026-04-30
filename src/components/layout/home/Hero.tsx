import {Link} from 'react-router-dom';

const Hero = () => {
  return (
    <section
      id="home"
      className="flex items-center bg-linear-to-b from-brand-50 via-page to-page pt-16 transition-colors duration-300 dark:from-surface-strong dark:via-page dark:to-page"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-strong mb-4">
              A Smarter Way to Find the{' '}
              <span className="text-brand-700 dark:text-brand-300">
                Right Tutor.
              </span>
            </h1>

            <p className="text-text-strong/80 mb-8 leading-relaxed">
              We connect students with qualified tutors who deliver structured,
              effective, and engaging learning experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/demo-class"
                className="rounded-lg bg-brand-600 px-8 py-3 text-text-on-brand shadow-theme-md transition hover:bg-brand-700 hover:shadow-theme-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                Book a Demo Class
              </Link>
             
            </div>
          </div>
          <div className="flex justify-center fade-in">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-linear-to-br from-brand-700 to-brand-500 rounded-full shadow-2xl flex items-center justify-center">
                <div className="flex h-60 w-60 items-center justify-center rounded-full bg-surface-elevated text-8xl shadow-theme-xl md:h-72 md:w-72 lg:h-88 lg:w-88">
                  <img
                    src="/images/hero/call-center-illustration.jpg"
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
