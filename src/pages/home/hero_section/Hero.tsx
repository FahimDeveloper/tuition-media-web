import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="home"
      className="from-brand-50 via-page to-page dark:from-surface-strong dark:via-page dark:to-page flex items-center bg-linear-to-b pt-16 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="fade-in">
            <h1 className="text-text-strong mb-4 text-5xl font-bold md:text-6xl lg:text-7xl">
              A Smarter Way to Find the{" "}
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
                className="bg-brand-600 text-text-on-brand shadow-theme-md hover:bg-brand-700 hover:shadow-theme-lg focus-visible:ring-brand-400 focus-visible:ring-offset-page rounded-lg px-8 py-3 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Book a Demo Class
              </Link>
            </div>
          </div>
          <div className="fade-in flex justify-center">
            <div className="relative">
              <div className="from-brand-700 to-brand-500 flex h-64 w-64 items-center justify-center rounded-full bg-linear-to-br shadow-2xl md:h-80 md:w-80 lg:h-96 lg:w-96">
                <div className="bg-surface-elevated shadow-theme-xl flex h-60 w-60 items-center justify-center rounded-full text-8xl md:h-72 md:w-72 lg:h-88 lg:w-88">
                  <img
                    src="/images/hero/call-center-illustration.png"
                    className="h-full w-full rounded-full object-cover"
                    alt=""
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="bg-brand-700 absolute -right-4 -bottom-4 h-24 w-24 animate-pulse rounded-full opacity-20"></div>
              <div className="bg-brand-500 absolute -top-4 -left-4 h-16 w-16 animate-pulse rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
