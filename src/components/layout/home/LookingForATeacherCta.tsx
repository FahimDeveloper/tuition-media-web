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

type FormValues = {
  name: string;
  phoneNumber: string;
};

type CallbackRequestPayload = {
  name: string;
  phoneNumber: string;
};

type FeedbackState =
  | {
      type: 'error';
      field: keyof FormValues;
      message: string;
    }
  | {
      type: 'success';
      message: string;
    }
  | null;

type TrustPoint = {
  title: string;
  description: string;
  icon: ReactNode;
};

const initialFormValues: FormValues = {
  name: '',
  phoneNumber: '',
};

const BANGLADESHI_PHONE_REGEX = /^(?:01\d{9}|\+8801\d{9})$/;

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

const normalizePhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/[()\s-]/g, '').trim();
};

const sanitizePhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/[^\d+\s()-]/g, '');
};

const validateForm = (values: FormValues): FeedbackState => {
  if (!values.name.trim()) {
    return {
      type: 'error',
      field: 'name',
      message: 'Enter your name.',
    };
  }

  if (!BANGLADESHI_PHONE_REGEX.test(normalizePhoneNumber(values.phoneNumber))) {
    return {
      type: 'error',
      field: 'phoneNumber',
      message: 'Enter a valid Bangladeshi mobile number.',
    };
  }

  return null;
};

const getInputClassName = (hasError: boolean) => {
  const baseClassName =
    'min-h-14 w-full rounded-xl border bg-surface-elevated px-4 text-base text-text-strong placeholder:text-text-soft transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70';

  const normalClassName =
    'border-brand-200/80 hover:border-brand-300 focus-visible:border-brand-400 dark:hover:border-brand-400';

  const errorClassName = 'border-red-300';

  return `${baseClassName} ${hasError ? errorClassName : normalClassName}`;
};

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

const FeedbackMessage = ({
  feedback,
  id,
}: {
  feedback: Exclude<FeedbackState, null>;
  id: string;
}) => {
  if (feedback.type === 'success') {
    return (
      <div
        id={id}
        role="status"
        aria-live="polite"
        className="flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800 dark:border-brand-500/30 dark:bg-brand-500/12 dark:text-brand-100"
      >
        <FiCheckCircle
          size={18}
          className="mt-0.5 shrink-0 text-brand-700 dark:text-brand-300"
          aria-hidden="true"
        />

        <p className="leading-relaxed">{feedback.message}</p>
      </div>
    );
  }

  return (
    <p
      id={id}
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/30 dark:bg-red-500/12 dark:text-red-200"
    >
      {feedback.message}
    </p>
  );
};

const LookingForATeacherCta = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  /**
   * Later you can replace this with RTK Query:
   *
   * const [requestCallback, {isLoading}] = useRequestCallbackMutation();
   *
   * Then inside handleSubmit:
   * await requestCallback(payload).unwrap();
   */
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameInputId = useId();
  const phoneInputId = useId();
  const phoneHelperTextId = useId();
  const feedbackId = useId();

  const updateField = (field: keyof FormValues, value: string) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setFeedback(null);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateField('name', event.target.value);
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateField('phoneNumber', sanitizePhoneNumber(event.target.value));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateForm(formValues);

    if (validationError) {
      setFeedback(validationError);
      return;
    }

    const payload: CallbackRequestPayload = {
      name: formValues.name.trim(),
      phoneNumber: normalizePhoneNumber(formValues.phoneNumber),
    };

    try {
      setIsSubmitting(true);

      /**
       * RTK Query mutation will go here later.
       *
       * Example:
       * await requestCallback(payload).unwrap();
       */
      console.log('Callback request payload:', payload);

      setFeedback({
        type: 'success',
        message:
          'Thank you. Our team will contact you shortly to help you find a suitable tutor.',
      });

      setFormValues(initialFormValues);
    } catch {
      setFeedback({
        type: 'error',
        field: 'phoneNumber',
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nameHasError = feedback?.type === 'error' && feedback.field === 'name';
  const phoneHasError =
    feedback?.type === 'error' && feedback.field === 'phoneNumber';

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

              <form
                className="mt-6 space-y-4"
                onSubmit={handleSubmit}
                noValidate
              >
                <div>
                  <label
                    htmlFor={nameInputId}
                    className="mb-2 block text-sm font-semibold text-text-strong"
                  >
                    Name
                  </label>

                  <input
                    id={nameInputId}
                    name="name"
                    type="text"
                    value={formValues.name}
                    onChange={handleNameChange}
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={nameHasError}
                    aria-describedby={nameHasError ? feedbackId : undefined}
                    className={getInputClassName(nameHasError)}
                  />
                </div>

                <div>
                  <label
                    htmlFor={phoneInputId}
                    className="mb-2 block text-sm font-semibold text-text-strong"
                  >
                    Phone number
                  </label>

                  <input
                    id={phoneInputId}
                    name="phoneNumber"
                    type="tel"
                    value={formValues.phoneNumber}
                    onChange={handlePhoneNumberChange}
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="01 or +8801"
                    aria-invalid={phoneHasError}
                    aria-describedby={
                      phoneHasError
                        ? `${phoneHelperTextId} ${feedbackId}`
                        : phoneHelperTextId
                    }
                    className={getInputClassName(phoneHasError)}
                  />

                  <p
                    id={phoneHelperTextId}
                    className="mt-2 text-sm leading-relaxed text-text-strong/65"
                  >
                    Accepted formats: 01XXXXXXXXX and +8801XXXXXXXXX.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 text-base font-semibold text-text-on-brand shadow-theme-md transition-all duration-200 hover:bg-brand-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70"
                >
                  {isSubmitting ? 'Submitting...' : 'Request a Callback'}
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
