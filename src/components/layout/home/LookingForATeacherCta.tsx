import {type ReactNode} from 'react';
import {FiClock, FiPhoneCall, FiShield} from 'react-icons/fi';
import LeadForm from '../forms/LeadForm';

type TrustPoint = {
  title: string;
  description: string;
  icon: ReactNode;
};

const trustPoints: TrustPoint[] = [
  {
    title: 'Fast response',
    description: 'Share your number and our team will follow up quickly.',
    icon: <FiPhoneCall size={18} />,
  },
  {
    title: 'Trusted guidance',
    description: 'We help narrow down subject, class, area, and schedule.',
    icon: <FiShield size={18} />,
  },
  {
    title: 'Simple process',
    description: 'Just a quick request to get started.',
    icon: <FiClock size={18} />,
  },
];

const TrustPointCard = ({point}: {point: TrustPoint}) => {
  return (
    <article className="rounded-2xl border border-brand-200/20 bg-brand-50/10 p-4 backdrop-blur-sm">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-300/30 bg-brand-50/10 text-brand-100">
        {point.icon}
      </div>

      <h3 className="mt-4 text-sm font-semibold text-text-on-brand sm:text-base">
        {point.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-text-on-brand/75">
        {point.description}
      </p>
    </article>
  );
};

const LookingForATeacherCta = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-brand-900 via-brand-900 to-brand-800 py-20 sm:py-24">
      <div className="absolute inset-0 opacity-55" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-400/12 blur-3xl" />
        <div className="absolute -left-12 bottom-10 h-40 w-40 rounded-full bg-brand-500/12 blur-3xl" />
        <div className="absolute -right-10 top-16 h-48 w-48 rounded-full bg-brand-300/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
          <div className="max-w-2xl">
            <h2 className="mt-5 font-poppins text-3xl font-extrabold leading-tight text-text-on-brand sm:text-4xl lg:text-5xl">
              Need a Tutor?
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-on-brand/80 sm:text-lg">
              Tell us what you need. We will help you find the right tutor
              quickly.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-on-brand/80 sm:text-lg">
              Share your name and phone number. Our team will contact you to
              understand your subject, class, location, and schedule, then guide
              you to a suitable tutor.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {trustPoints.map((point) => (
                <TrustPointCard key={point.title} point={point} />
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-brand-200/20 bg-surface-elevated/95 p-5 shadow-theme-xl backdrop-blur-sm sm:p-6 lg:p-7">
            <div className="rounded-2xl border border-border bg-surface-elevated/80 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                  <FiPhoneCall size={20} />
                </div>

                <div>
                  <h3 className="font-poppins text-xl font-bold text-text-strong">
                    Request a callback
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-text-strong/75">
                    Enter your name and phone number. Our team will call you
                    back to help match the right tutor.
                  </p>
                </div>
              </div>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LookingForATeacherCta;
