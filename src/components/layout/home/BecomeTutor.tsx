import { UserIcon } from "@/icons";
import { FaPaperPlane, FaUserCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";

const BecomeTutor = () => {
  return (
    <section className="bg-brand-900 overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto px-4">
          <div className="-mx-5 flex flex-wrap items-center">
            <div className="mb-20 w-full px-5 lg:mb-0 lg:w-4/7">
              <div className="max-w-xl">
                <span className="font-poppins text-brand-200 text-sm font-semibold tracking-[0.14em] uppercase">
                  Become a Tutor on TutoriumBD
                </span>
                <h2 className="font-poppins text-text-on-brand mt-6 mb-6 text-4xl leading-tight font-extrabold md:text-5xl">
                  How Tutors Can Work With Us
                </h2>
                <p className="text-text-on-brand/80 mb-10 text-lg leading-relaxed">
                  Discover quality tuition leads, apply in minutes, and connect
                  directly with parents who are ready to hire—all in one trusted
                  platform
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/signup"
                    className="bg-brand-600 text-text-on-brand shadow-theme-md hover:bg-brand-700 hover:shadow-theme-lg focus-visible:ring-brand-400 focus-visible:ring-offset-page rounded-lg px-8 py-3 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    Create Tutor Account
                  </Link>
                  <Link
                    to="/signup"
                    className="border-brand-600 text-text-on-brand hover:bg-brand-600 hover:text-text-on-brand focus-visible:ring-brand-400 focus-visible:ring-offset-page dark:border-brand-400 dark:text-brand-300 dark:hover:bg-brand-500 rounded-lg border-2 px-8 py-3 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:hover:text-white"
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
                <li className="border-brand-700/70 mb-8 flex border-b pb-10">
                  <div className="mr-8">
                    <span className="border-brand-500/50 bg-brand-600/20 text-brand-100 flex h-14 w-14 items-center justify-center rounded-full border text-lg font-bold">
                      <UserIcon />
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <h3 className="text-text-on-brand mb-2 text-lg font-semibold">
                      Create a tutor profile
                    </h3>
                    <p className="text-text-on-brand/80 text-base leading-relaxed">
                      Create your profile in minutes with sign up information.
                    </p>
                  </div>
                </li>
                <li className="border-brand-700/70 mb-8 flex border-b pb-10">
                  <div className="mr-8">
                    <span className="border-brand-500/50 bg-brand-600/20 text-brand-100 flex h-14 w-14 items-center justify-center rounded-full border text-lg font-bold">
                      <FaUserCheck />
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <h3 className="text-text-on-brand mb-2 text-lg font-semibold">
                      Complete your profile
                    </h3>
                    <p className="text-text-on-brand/80 text-base leading-relaxed">
                      Make your profile at least 80% to get fast responses.
                    </p>
                  </div>
                </li>
                <li className="border-brand-700/70 mb-8 flex border-b pb-10">
                  <div className="mr-8">
                    <span className="border-brand-500/50 bg-brand-600/20 text-brand-100 flex h-14 w-14 items-center justify-center rounded-full border text-lg font-bold">
                      <FaPaperPlane />
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <h3 className="text-text-on-brand mb-2 text-lg font-semibold">
                      Apply for Tuition Job
                    </h3>
                    <p className="text-text-on-brand/80 text-base leading-relaxed">
                      Visit “Job Board” daily & apply for desired tuition jobs.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-8">
                    <span className="border-brand-500/50 bg-brand-600/20 text-brand-100 flex h-14 w-14 items-center justify-center rounded-full border text-lg font-bold">
                      <FaChalkboardTeacher />
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <h3 className="text-text-on-brand mb-2 text-lg font-semibold">
                      Start tutoring
                    </h3>
                    <p className="text-text-on-brand/80 text-base leading-relaxed">
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
