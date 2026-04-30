import {UserIcon} from '@/icons';
import {FaPaperPlane, FaUserCheck} from 'react-icons/fa6';
import {Link} from 'react-router-dom';
import {FaChalkboardTeacher} from 'react-icons/fa';

const BecomeTutor = () => {
  return (
    <section className="overflow-hidden bg-brand-900 py-20">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="mx-auto px-4">
          <div className="flex flex-wrap items-center -mx-5">
            <div className="mb-20 w-full px-5 lg:mb-0 lg:w-4/7">
              <div className="max-w-xl">
                <span className="font-poppins text-sm font-semibold uppercase tracking-[0.14em] text-brand-200">
                  Become a Tutor on TutoriumBD
                </span>
                <h2 className="mt-6 mb-6 font-poppins text-4xl font-extrabold leading-tight text-text-on-brand md:text-5xl">
                  How Tutors Can Work With Us
                </h2>
                <p className="mb-10 text-lg leading-relaxed text-text-on-brand/80">
                  Discover quality tuition leads, apply in minutes, and connect
                  directly with parents who are ready to hire—all in one trusted
                  platform
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/signup"
                    className="rounded-lg bg-brand-600 px-8 py-3 text-text-on-brand shadow-theme-md transition hover:bg-brand-700 hover:shadow-theme-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                  >
                    Create Tutor Account
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-lg border-2 border-brand-600 px-8 py-3 text-text-on-brand transition hover:bg-brand-600 
                    hover:text-text-on-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-page dark:border-brand-400 dark:text-brand-300 dark:hover:bg-brand-500 dark:hover:text-white"
                  >
                    See tuition jobs
                  </Link>
                </div>
                {/* <Link
                  className="inline-block rounded-lg bg-brand-600 px-10 py-4 font-semibold text-text-on-brand shadow-lg shadow-brand-950/40 transition duration-200 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
                  to="/signup"
                >
                  Create Tutor Account
                </Link> */}
              </div>
            </div>
            <div className="w-full px-5 lg:w-3/7">
              <ul>
                <li className="mb-8 flex border-b border-brand-700/70 pb-10">
                  <div className="mr-8">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-500/50 bg-brand-600/20 text-lg font-bold text-brand-100">
                      <UserIcon />
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <h3 className="mb-2 text-lg font-semibold text-text-on-brand">
                      Create a tutor profile
                    </h3>
                    <p className="text-base leading-relaxed text-text-on-brand/80">
                      Create your profile in minutes with sign up information.
                    </p>
                  </div>
                </li>
                <li className="mb-8 flex border-b border-brand-700/70 pb-10">
                  <div className="mr-8">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-500/50 bg-brand-600/20 text-lg font-bold text-brand-100">
                      <FaUserCheck />
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <h3 className="mb-2 text-lg font-semibold text-text-on-brand">
                      Complete your profile
                    </h3>
                    <p className="text-base leading-relaxed text-text-on-brand/80">
                      Make your profile at least 80% to get fast responses.
                    </p>
                  </div>
                </li>
                <li className="mb-8 flex border-b border-brand-700/70 pb-10">
                  <div className="mr-8">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-500/50 bg-brand-600/20 text-lg font-bold text-brand-100">
                      <FaPaperPlane />
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <h3 className="mb-2 text-lg font-semibold text-text-on-brand">
                      Apply for Tuition Job
                    </h3>
                    <p className="text-base leading-relaxed text-text-on-brand/80">
                      Visit “Job Board” daily & apply for desired tuition jobs.
                    </p>
                  </div>
                </li>
                <li className="flex ">
                  <div className="mr-8">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-500/50 bg-brand-600/20 text-lg font-bold text-brand-100">
                      <FaChalkboardTeacher />
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <h3 className="mb-2 text-lg font-semibold text-text-on-brand">
                      Start tutoring
                    </h3>
                    <p className="text-base leading-relaxed text-text-on-brand/80">
                      Be confident in the first meet & start tutoring.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeTutor;
