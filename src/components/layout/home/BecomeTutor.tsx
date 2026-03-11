const BecomeTutor = () => {
  return (
    <section className="overflow-hidden bg-brand-900 py-32">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="mx-auto px-4">
          <div className="flex flex-wrap items-center -mx-5">
            <div className="mb-20 w-full px-5 lg:mb-0 lg:w-4/7">
              <div className="max-w-xl">
                <span className="font-poppins text-sm font-semibold uppercase tracking-[0.14em] text-brand-200">
                  Become a Tutor on Tuition Media
                </span>
                <h2 className="mt-6 mb-6 font-poppins text-4xl font-extrabold leading-tight text-text-on-brand md:text-5xl">
                  Turn your teaching skills into steady tuition opportunities
                </h2>
                <p className="mb-10 text-lg leading-relaxed text-text-on-brand/80">
                  Join a trusted platform where tutors discover relevant tuition
                  leads, apply in minutes, and connect directly with guardians
                  who are ready to hire.
                </p>
                <a
                  className="inline-block rounded-lg bg-brand-600 px-10 py-4 font-semibold text-text-on-brand shadow-lg shadow-brand-950/40 transition duration-200 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
                  href="/signup"
                >
                  Create Tutor Account
                </a>
              </div>
            </div>
            <div className="w-full px-5 lg:w-3/7">
              <ul>
                <li className="mb-8 flex border-b border-brand-700/70 pb-10">
                  <div className="mr-8">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-500/50 bg-brand-600/20 text-lg font-bold text-brand-100">
                      1
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <h3 className="mb-2 text-lg font-semibold text-text-on-brand">
                      Discover matching tuition posts
                    </h3>
                    <p className="text-base leading-relaxed text-text-on-brand/80">
                      Browse tuition opportunities filtered by subject, class
                      level, location, and schedule that fit your strengths.
                    </p>
                  </div>
                </li>
                <li className="mb-8 flex border-b border-brand-700/70 pb-10">
                  <div className="mr-8">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-500/50 bg-brand-600/20 text-lg font-bold text-brand-100">
                      2
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <h3 className="mb-2 text-lg font-semibold text-text-on-brand">
                      Review details with confidence
                    </h3>
                    <p className="text-base leading-relaxed text-text-on-brand/80">
                      Check budget, expectations, and class requirements before
                      applying so every application is intentional.
                    </p>
                  </div>
                </li>
                <li className="mb-8 flex border-b border-brand-700/70 pb-10">
                  <div className="mr-8">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-500/50 bg-brand-600/20 text-lg font-bold text-brand-100">
                      3
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <h3 className="mb-2 text-lg font-semibold text-text-on-brand">
                      Stand out with your tutor profile
                    </h3>
                    <p className="text-base leading-relaxed text-text-on-brand/80">
                      Showcase your experience, teaching style, and strengths so
                      guardians can choose you faster.
                    </p>
                  </div>
                </li>
                <li className="flex ">
                  <div className="mr-8">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-500/50 bg-brand-600/20 text-lg font-bold text-brand-100">
                      4
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <h3 className="mb-2 text-lg font-semibold text-text-on-brand">
                      Apply quickly and start teaching
                    </h3>
                    <p className="text-base leading-relaxed text-text-on-brand/80">
                      Send applications in a few clicks and build long-term
                      tuition relationships with motivated students.
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
