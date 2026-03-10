const Hero = () => {
  return (
    <section
      id="home"
      className="bg-brand-50 min-h-screen flex items-center pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-strong mb-4">
              Find <span className="text-brand-700">Tuition Opportunities</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-strong/80 mb-8">
              Built for Tutors Across Bangladesh
            </p>
            <p className="text-text-strong/80 mb-8 leading-relaxed">
              Tuition Media helps you discover relevant tuition leads, apply
              quickly, and connect with guardians through a simple, trusted
              flow.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/tuition"
                className="bg-brand-600 text-text-on-brand px-8 py-3 rounded-lg hover:bg-brand-700 transition shadow-lg hover:shadow-xl"
              >
                Find Tuition Jobs
              </a>
              <a
                href="/signup"
                className="border-2 border-brand-600 text-brand-700 px-8 py-3 rounded-lg hover:bg-brand-600 hover:text-text-on-brand transition"
              >
                Join as a Tutor
              </a>
            </div>
          </div>
          <div className="flex justify-center fade-in">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-brand-700 to-brand-500 rounded-full shadow-2xl flex items-center justify-center">
                <div className="w-60 h-60 md:w-72 md:h-72 lg:w-88 lg:h-88 bg-white rounded-full flex items-center justify-center text-8xl">
                  <img
                    src="/call-center-illustration.jpg"
                    className="object-cover w-full h-full rounded-full"
                    alt=""
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
