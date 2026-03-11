const marqueeItems = [
  'Math Tutors',
  'English Tutors',
  'Science Tutors',
  'University Prep',
  'Spoken English',
  'Coding Mentors',
  'Exam Coaching',
  'Music Tutors',
  'Physics Tutors',
];

const Marquee = () => {
  const tickerItems = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative bg-brand-800 py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="tm-marquee-panel relative overflow-hidden rounded-xl border border-brand-200/20 bg-brand-900/20 py-3 shadow-[0_12px_30px_rgba(17,45,78,0.25)]">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-brand-800 to-transparent sm:w-16 lg:w-24"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-brand-800 to-transparent sm:w-16 lg:w-24"
            aria-hidden="true"
          />

          <div className="tm-marquee-track flex w-max items-center gap-6 whitespace-nowrap px-4 font-poppins text-2xl font-extrabold uppercase tracking-[0.08em] text-text-on-brand sm:gap-8 sm:px-6 sm:text-3xl lg:text-4xl">
            {tickerItems.map((item, index) => (
              <div key={`${item}-${index}`} className="flex items-center gap-6 sm:gap-8">
                <span>{item}</span>
                {index < tickerItems.length - 1 ? (
                  <span className="text-brand-300/85" aria-hidden="true">
                    •
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .tm-marquee-track {
            animation: marquee-scroll 26s linear infinite;
          }

          .tm-marquee-track:hover {
            animation-play-state: paused;
          }

          @keyframes marquee-scroll {
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-50%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .tm-marquee-panel {
              overflow-x: auto;
            }

            .tm-marquee-track {
              animation: none;
              width: max-content;
              transform: none;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Marquee;
