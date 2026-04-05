import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useId,
  useState,
} from 'react';
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiPhoneCall,
  FiShield,
} from 'react-icons/fi';

const BANGLADESHI_PHONE_PATTERN = /^(?:\+8801\d{9}|01\d{9})$/;
const PHONE_INPUT_PLACEHOLDER = '01XXXXXXXXX or +8801XXXXXXXXX';
const PHONE_HELPER_TEXT =
  'Use your Bangladeshi mobile number. Accepted formats: 01XXXXXXXXX and +8801XXXXXXXXX.';
const INVALID_PHONE_MESSAGE = 'Enter a valid Bangladeshi mobile number.';
const SUCCESS_MESSAGE =
  'Thank you. Our team will contact you shortly to help you find a suitable tutor.';

const SECTION_HEADING = 'Need a Tutor?';
const SECTION_INTRO =
  'Tell us what you need. We will help you find the right tutor quickly.';
const SECTION_SUPPORTING_COPY =
  'Share your phone number and our team will contact you to understand your subject, class, location, and schedule, then guide you to a suitable tutor.';
const FORM_TITLE = 'Request a callback';
const FORM_DESCRIPTION =
  'Enter your number and our team will call you back to help match the right tutor.';

const sectionClasses =
  'relative overflow-hidden bg-linear-to-br from-brand-900 via-brand-900 to-brand-800 py-20 sm:py-24';
const containerClasses = 'relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
const contentGridClasses =
  'grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10';
const trustPointCardClasses =
  'rounded-2xl border border-brand-200/20 bg-brand-50/10 p-4 backdrop-blur-sm';
const trustPointIconClasses =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-300/30 bg-brand-50/10 text-brand-100';
const formShellClasses =
  'rounded-[28px] border border-brand-200/20 bg-surface/95 p-5 shadow-[0_20px_50px_rgba(17,45,78,0.22)] backdrop-blur-sm dark:border-gray-800 dark:bg-gray-dark/95 dark:shadow-[0_24px_60px_rgba(3,7,18,0.4)] sm:p-6 lg:p-7';
const formPanelClasses =
  'rounded-2xl border border-brand-100/80 bg-white/80 p-5 dark:border-gray-800 dark:bg-white/[0.04] sm:p-6';
const phoneInputBaseClasses =
  'min-h-14 w-full rounded-xl border bg-surface px-4 text-base text-text-strong placeholder:text-text-strong/45 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 dark:border-gray-700 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus-visible:bg-gray-900';
const phoneInputDefaultClasses =
  'border-brand-200/80 hover:border-brand-300 focus-visible:border-brand-400 dark:hover:border-brand-400';
const phoneInputErrorClasses = 'border-red-300';
const submitButtonClasses =
  'inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 text-base font-semibold text-text-on-brand shadow-[0_10px_24px_rgba(63,114,175,0.28)] transition-all duration-200 hover:bg-brand-700 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70';
const errorFeedbackClasses =
  'rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/30 dark:bg-red-500/12 dark:text-red-200';
const successFeedbackClasses =
  'flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800 dark:border-brand-500/30 dark:bg-brand-500/12 dark:text-brand-100';

type TrustPoint = {
  title: string;
  description: string;
  icon: ReactNode;
};

type FeedbackState = {
  type: 'error' | 'success';
  message: string;
} | null;

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

const backgroundOrbs = [
  'absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-400/12 blur-3xl',
  'absolute -left-12 bottom-10 h-40 w-40 rounded-full bg-brand-500/12 blur-3xl',
  'absolute -right-10 top-16 h-48 w-48 rounded-full bg-brand-300/10 blur-3xl',
];

// Normalize common separators so users can type naturally while validation stays strict.
const normalizePhoneNumber = (value: string) =>
  value.replace(/[()\s-]/g, '').trim();

const sanitizePhoneNumberInput = (value: string) =>
  value.replace(/[^\d+\s()-]/g, '');

const isValidBangladeshiPhoneNumber = (value: string) =>
  BANGLADESHI_PHONE_PATTERN.test(normalizePhoneNumber(value));

const getInputDescribedBy = (helperTextId: string, feedbackId: string) =>
  `${helperTextId} ${feedbackId}`;

type TrustPointCardProps = {
  point: TrustPoint;
};

const TrustPointCard = ({point}: TrustPointCardProps) => {
  return (
    <article className={trustPointCardClasses}>
      <div className={trustPointIconClasses}>{point.icon}</div>
      <h3 className="mt-4 text-sm font-semibold text-text-on-brand sm:text-base">
        {point.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-on-brand/75">
        {point.description}
      </p>
    </article>
  );
};

type FeedbackMessageProps = {
  feedback: Exclude<FeedbackState, null>;
  id: string;
};

const FeedbackMessage = ({feedback, id}: FeedbackMessageProps) => {
  if (feedback.type === 'error') {
    return (
      <p id={id} role="alert" className={errorFeedbackClasses}>
        {feedback.message}
      </p>
    );
  }

  return (
    <div
      id={id}
      role="status"
      aria-live="polite"
      className={successFeedbackClasses}
    >
      <FiCheckCircle
        size={18}
        className="mt-0.5 shrink-0 text-brand-700 dark:text-brand-300"
        aria-hidden="true"
      />
      <p className="leading-relaxed">{feedback.message}</p>
    </div>
  );
};

const LookingForATeacherCta = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const inputId = useId();
  const helperTextId = useId();
  const feedbackId = useId();

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(sanitizePhoneNumberInput(event.target.value));

    if (feedback) {
      setFeedback(null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidBangladeshiPhoneNumber(phoneNumber)) {
      setFeedback({type: 'error', message: INVALID_PHONE_MESSAGE});
      return;
    }

    // Client-side confirmation only for now. Replace with real submission when the lead flow exists.
    setFeedback({type: 'success', message: SUCCESS_MESSAGE});
    setPhoneNumber('');
  };

  const hasError = feedback?.type === 'error';
  const inputClasses = `${phoneInputBaseClasses} ${
    hasError ? phoneInputErrorClasses : phoneInputDefaultClasses
  }`;

  return (
    <section className={sectionClasses}>
      <div className="absolute inset-0 opacity-55" aria-hidden="true">
        {backgroundOrbs.map((orbClassName) => (
          <div key={orbClassName} className={orbClassName} />
        ))}
      </div>

      <div className={containerClasses}>
        <div className={contentGridClasses}>
          <div className="max-w-2xl">
            <h2 className="mt-5 font-poppins text-3xl font-extrabold leading-tight text-text-on-brand sm:text-4xl lg:text-5xl">
              {SECTION_HEADING}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-on-brand/80 sm:text-lg">
              {SECTION_INTRO}
            </p>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-on-brand/80 sm:text-lg">
              {SECTION_SUPPORTING_COPY}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {trustPoints.map((point) => (
                <TrustPointCard key={point.title} point={point} />
              ))}
            </div>
          </div>

          <div className={formShellClasses}>
            <div className={formPanelClasses}>
              <div className="flex items-start gap-3">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                  <FiPhoneCall size={20} />
                </div>

                <div>
                  <h3 className="font-poppins text-xl font-bold text-text-strong">
                    {FORM_TITLE}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-strong/75">
                    {FORM_DESCRIPTION}
                  </p>
                </div>
              </div>

              <form
                className="mt-6 space-y-4"
                onSubmit={handleSubmit}
                noValidate
              >
                <div>
                  <label
                    htmlFor={inputId}
                    className="mb-2 block text-sm font-semibold text-text-strong"
                  >
                    Phone number
                  </label>

                  <input
                    id={inputId}
                    name="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={PHONE_INPUT_PLACEHOLDER}
                    aria-describedby={getInputDescribedBy(
                      helperTextId,
                      feedbackId,
                    )}
                    aria-invalid={hasError}
                    className={inputClasses}
                  />

                  <p
                    id={helperTextId}
                    className="mt-2 text-sm leading-relaxed text-text-strong/65"
                  >
                    {PHONE_HELPER_TEXT}
                  </p>
                </div>

                <button type="submit" className={submitButtonClasses}>
                  Request a Callback
                  <FiArrowRight size={18} aria-hidden="true" />
                </button>

                {feedback ? (
                  <FeedbackMessage id={feedbackId} feedback={feedback} />
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LookingForATeacherCta;
