const trustedCommunityImages = [
  {
    src: 'https://readymadeui.com/team-1.webp',
    alt: 'Experienced tutor smiling',
  },
  {
    src: 'https://readymadeui.com/team-2.webp',
    alt: 'Guardian profile photo',
  },
  {
    src: 'https://readymadeui.com/team-3.webp',
    alt: 'Student profile photo',
  },
];

const Hero = () => {
  return (
    <div className="bg-radial-[at_50%_5%] from-surface via-surface to-brand-100">
      <div className="px-4 py-10 sm:px-10 lg:py-16 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight! text-text-strong md:text-5xl">
              Find the Right Tutor.
              <span className="block text-brand-600">
                Build Academic Confidence.
              </span>
            </h1>

            <p className="text-base leading-relaxed text-text-strong/80">
              Tuition Media connects guardians, students, and verified tutors in
              one trusted marketplace so you can find the best learning match
              quickly and confidently.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <button className="cursor-pointer rounded-full border border-brand-600 bg-brand-600 px-5 py-2.5 text-base font-medium tracking-wide text-text-on-brand transition-all hover:bg-brand-700">
                Find Tuitions
              </button>
              <button className="cursor-pointer rounded-full border border-brand-600 bg-transparent px-5 py-2.5 text-base font-medium tracking-wide text-brand-700 transition-all hover:bg-brand-50">
                Become a Tutor
              </button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <div className="flex -space-x-2">
                {trustedCommunityImages.map((image) => (
                  <img
                    key={image.src}
                    className="h-10 w-10 rounded-full border-2 border-surface"
                    src={image.src}
                    alt={image.alt}
                  />
                ))}
              </div>

              <div className="text-base text-text-strong/75">
                <span className="font-semibold text-text-strong">
                  Over 10,000
                </span>{' '}
                tutors and guardians trust us.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
