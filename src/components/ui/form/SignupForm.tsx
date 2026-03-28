import {type KeyboardEvent, useState} from 'react';
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Alert, Button, Form, Input, Select} from 'antd';
import type {FormProps} from 'antd';
import {Link} from 'react-router-dom';
import {
  getLocationOptionsForCity,
  isCityName,
  isLocationForCity,
  SIGNUP_CITY_OPTIONS,
  type CityName,
} from './signupLocationData';

import {
  isMockAuthError,
  signupWithMockAuth,
  type MockSignupPayload,
} from './mockAuth';

type GenderValue = 'male' | 'female' | 'other' | 'prefer_not_to_say';

type SignupFormValues = {
  fullName: string;
  phone: string;
  email: string;
  gender?: GenderValue;
  city?: CityName;
  location?: string;
  password: string;
  confirmPassword: string;
};

type CompletedSignupFormValues = SignupFormValues & {
  gender: GenderValue;
  city: CityName;
  location: string;
};

type SubmissionFeedback = {
  type: 'error' | 'success';
  message: string;
} | null;

const FULL_NAME_MIN_LENGTH = 2;
const FULL_NAME_MAX_LENGTH = 80;
const EMAIL_MAX_LENGTH = 100;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;
const BANGLADESHI_PHONE_PATTERN = /^(?:\+8801\d{9}|01\d{9})$/;
const FULL_NAME_ALLOWED_PATTERN = /^[\p{L} .'-]+$/u;
const FULL_NAME_HAS_LETTER_PATTERN = /\p{L}/u;

const DEFAULT_FORM_VALUES: SignupFormValues = {
  fullName: '',
  phone: '',
  email: '',
  gender: undefined,
  city: undefined,
  location: undefined,
  password: '',
  confirmPassword: '',
};

const GENDER_OPTIONS: {label: string; value: GenderValue}[] = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'},
  {label: 'Prefer not to say', value: 'prefer_not_to_say'},
];

const TEXT = {
  brandPrimary: 'Tuition',
  brandAccent: 'Media',
  badgeLabel: 'Tutor signup',
  eyebrow: 'Create your account',
  title: 'Set up your tutor profile',
  intro:
    'Start with the essentials so Tuition Media can understand who you are, where you teach, and how to present your profile clearly.',
  fullNameLabel: 'Full name',
  fullNamePlaceholder: 'Your full name',
  phoneLabel: 'Phone',
  phonePlaceholder: '01XXXXXXXXX or +8801XXXXXXXXX',
  phoneHint: 'Use a Bangladeshi mobile number.',
  emailLabel: 'Email address',
  emailPlaceholder: 'you@example.com',
  genderLabel: 'Gender',
  genderPlaceholder: 'Select gender',
  cityLabel: 'City',
  cityPlaceholder: 'Select city',
  locationLabel: 'Location',
  locationPlaceholder: 'Select location',
  locationDisabledPlaceholder: 'Select a city first',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Create a password',
  passwordHint: 'Use at least 8 characters and include letters and numbers.',
  confirmPasswordLabel: 'Confirm password',
  confirmPasswordPlaceholder: 'Re-enter your password',
  capsLockWarning: 'Caps Lock is on.',
  submit: 'Create account',
  submitting: 'Creating account...',
  successPrefix: 'Demo account created for',
  successSuffix: 'You can now sign in with these credentials.',
  termsIntro: "By creating an account, you agree to Tuition Media's",
  termsOfService: 'Terms of Service',
  privacyPolicy: 'Privacy Policy',
  loginPrompt: 'Already have an account?',
  loginCta: 'Sign in',
  noCityMatch: 'No matching city found.',
  noLocationMatch: 'No matching location found.',
} as const;

const VALIDATION = {
  fullNameRequired: 'Please enter your full name.',
  fullNameTooShort: 'Full name must be at least 2 characters.',
  fullNameTooLong: 'Full name is too long.',
  fullNameInvalid:
    'Use letters and common name characters only, such as spaces, dots, apostrophes, or hyphens.',
  fullNameNoLetters: 'Full name must include letters.',
  phoneRequired: 'Please enter your phone number.',
  phoneInvalid: 'Enter a valid Bangladeshi mobile number.',
  emailRequired: 'Please enter your email.',
  emailInvalid: 'Please enter a valid email address.',
  emailSpaces: 'Email cannot contain spaces.',
  emailTooLong: 'Email is too long.',
  genderRequired: 'Please select your gender.',
  cityRequired: 'Please select your city.',
  locationRequired: 'Please select your location.',
  locationInvalid: 'Please choose a valid location for the selected city.',
  passwordRequired: 'Please create a password.',
  passwordInvalidText: 'Password must be valid text.',
  passwordSpacesOnly: 'Password cannot be only spaces.',
  passwordTooShort: 'Password must be at least 8 characters.',
  passwordTooLong: 'Password is too long.',
  passwordNeedsLetter: 'Password must include at least one letter.',
  passwordNeedsNumber: 'Password must include at least one number.',
  confirmPasswordRequired: 'Please confirm your password.',
  confirmPasswordMismatch: 'Passwords do not match.',
  duplicateEmail:
    'An account with this email already exists in local demo data.',
  duplicatePhone:
    'An account with this phone number already exists in local demo data.',
  genericError: 'Something went wrong. Please try again.',
} as const;

const sectionClasses =
  'relative overflow-hidden bg-[linear-gradient(180deg,rgba(242,247,252,0.98)_0%,rgba(249,247,247,1)_100%)] px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8';

const backgroundGlowClasses =
  'pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,rgba(102,153,207,0.18),transparent_42%),radial-gradient(circle_at_top_right,rgba(63,114,175,0.12),transparent_32%)]';

const cardShellClasses =
  'overflow-hidden rounded-[30px] border border-brand-100/80 bg-surface shadow-[0_24px_60px_rgba(17,45,78,0.12)]';

const brandBadgeClasses =
  'inline-flex items-center gap-3 rounded-full border border-brand-200/70 bg-brand-50/80 px-4 py-2 text-sm font-semibold text-brand-700 transition-all duration-200 hover:border-brand-300 hover:bg-brand-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70';

const inputClasses =
  '!h-12 !rounded-xl !border-brand-200/80 !bg-brand-50/70 !px-3 !text-text-strong !shadow-none transition-all duration-200 hover:!border-brand-400 focus-within:!border-brand-500 focus-within:!bg-white focus-within:!shadow-[0_0_0_4px_rgba(63,114,175,0.12)]';

const selectClasses =
  '[&_.ant-select-selector]:!h-12 [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!border-brand-200/80 [&_.ant-select-selector]:!bg-brand-50/70 [&_.ant-select-selector]:!px-3 [&_.ant-select-selector]:!shadow-none [&_.ant-select-selection-item]:!text-text-strong [&_.ant-select-selection-placeholder]:!text-text-strong/45 [&_.ant-select-arrow]:!text-brand-500 transition-all duration-200 hover:[&_.ant-select-selector]:!border-brand-400 focus-within:[&_.ant-select-selector]:!border-brand-500 focus-within:[&_.ant-select-selector]:!bg-white focus-within:[&_.ant-select-selector]:!shadow-[0_0_0_4px_rgba(63,114,175,0.12)]';

const primaryButtonClasses =
  '!h-12 !rounded-xl !border-0 !bg-brand-600 !font-semibold !text-text-on-brand !shadow-lg !shadow-brand-600/20 transition-all duration-200 hover:!bg-brand-700 focus-visible:!outline-none focus-visible:!ring-4 focus-visible:!ring-brand-200/80';

const formClasses =
  '[&_.ant-form-item]:mb-0 [&_.ant-form-item-explain-error]:!mt-2 [&_.ant-form-item-explain-error]:!text-xs [&_.ant-form-item-explain-error]:!font-medium [&_.ant-form-item-extra]:!mt-2 [&_.ant-form-item-extra]:!text-sm [&_.ant-form-item-extra]:!leading-5 [&_.ant-form-item-extra]:!text-text-strong/70 [&_.ant-form-item-label>label]:!pb-2 [&_.ant-form-item-label>label]:!font-semibold [&_.ant-form-item-label>label]:!text-text-strong';

const successAlertClasses =
  'rounded-xl! border! border-brand-200/80! bg-brand-50/90! [&_.ant-alert-content]:text-left';

const errorAlertClasses =
  'rounded-xl! border! border-red-200! bg-red-50/90! [&_.ant-alert-content]:text-left';

const linkClasses =
  'font-semibold text-brand-700 underline-offset-4 transition-colors duration-200 hover:text-brand-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70';

const normalizeWhitespace = (value: string) =>
  value.trim().replace(/\s+/g, ' ');

const normalizeFullName = (value: unknown) => {
  if (typeof value !== 'string') {
    return '';
  }

  return normalizeWhitespace(value);
};

const sanitizePhoneInput = (value: unknown) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replace(/[^\d+\s()-]/g, '');
};

const stripPhoneFormatting = (value: string) =>
  value.replace(/[()\s-]/g, '').trim();

const normalizeBangladeshiPhone = (value: string) => {
  const sanitized = stripPhoneFormatting(value);

  return sanitized.startsWith('01') ? `+88${sanitized}` : sanitized;
};

const isValidBangladeshiPhone = (value: string) =>
  BANGLADESHI_PHONE_PATTERN.test(stripPhoneFormatting(value));

const normalizeEmail = (value: unknown) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().toLowerCase();
};

const isGenderValue = (value: unknown): value is GenderValue =>
  value === 'male' ||
  value === 'female' ||
  value === 'other' ||
  value === 'prefer_not_to_say';

function assertCompleteSignupValues(
  values: SignupFormValues,
): asserts values is CompletedSignupFormValues {
  if (
    !values.fullName ||
    !values.phone ||
    !values.email ||
    !values.password ||
    !values.confirmPassword ||
    !isGenderValue(values.gender) ||
    !isCityName(values.city) ||
    !values.location ||
    !isLocationForCity(values.city, values.location)
  ) {
    throw new Error(VALIDATION.genericError);
  }
}

const buildSignupPayload = (values: SignupFormValues): MockSignupPayload => {
  assertCompleteSignupValues(values);

  return {
    fullName: normalizeFullName(values.fullName),
    phone: normalizeBangladeshiPhone(values.phone),
    email: normalizeEmail(values.email),
    gender: values.gender,
    city: values.city,
    location: values.location,
    password: values.password,
  };
};

const validateFullName = async (_: unknown, value?: string) => {
  if (!value) return;

  if (value.length < FULL_NAME_MIN_LENGTH) {
    throw new Error(VALIDATION.fullNameTooShort);
  }

  if (value.length > FULL_NAME_MAX_LENGTH) {
    throw new Error(VALIDATION.fullNameTooLong);
  }

  if (!FULL_NAME_ALLOWED_PATTERN.test(value)) {
    throw new Error(VALIDATION.fullNameInvalid);
  }

  if (!FULL_NAME_HAS_LETTER_PATTERN.test(value)) {
    throw new Error(VALIDATION.fullNameNoLetters);
  }
};

const validatePhone = async (_: unknown, value?: string) => {
  if (!value) return;

  if (!isValidBangladeshiPhone(value)) {
    throw new Error(VALIDATION.phoneInvalid);
  }
};

const validateEmail = async (_: unknown, value?: string) => {
  if (!value) return;

  if (value.includes(' ')) {
    throw new Error(VALIDATION.emailSpaces);
  }

  if (value.length > EMAIL_MAX_LENGTH) {
    throw new Error(VALIDATION.emailTooLong);
  }
};

const validatePassword = async (_: unknown, value?: string) => {
  if (!value) return;

  if (typeof value !== 'string') {
    throw new Error(VALIDATION.passwordInvalidText);
  }

  if (value.trim().length === 0) {
    throw new Error(VALIDATION.passwordSpacesOnly);
  }

  if (value.length < PASSWORD_MIN_LENGTH) {
    throw new Error(VALIDATION.passwordTooShort);
  }

  if (value.length > PASSWORD_MAX_LENGTH) {
    throw new Error(VALIDATION.passwordTooLong);
  }

  if (!/[A-Za-z]/.test(value)) {
    throw new Error(VALIDATION.passwordNeedsLetter);
  }

  if (!/\d/.test(value)) {
    throw new Error(VALIDATION.passwordNeedsNumber);
  }
};

const getSignupErrorMessage = (error: unknown) => {
  if (!isMockAuthError(error)) {
    return VALIDATION.genericError;
  }

  if (error.code === 'EMAIL_EXISTS') {
    return VALIDATION.duplicateEmail;
  }

  if (error.code === 'PHONE_EXISTS') {
    return VALIDATION.duplicatePhone;
  }

  return VALIDATION.genericError;
};

const getCapsLockState = (event: KeyboardEvent<HTMLInputElement>) =>
  Boolean(event.getModifierState?.('CapsLock'));

const SignupBrandBadge = () => (
  <Link to="/" className={brandBadgeClasses}>
    <span className="font-poppins text-base font-extrabold tracking-tight text-text-strong">
      {TEXT.brandPrimary}{' '}
      <span className="text-brand-600">{TEXT.brandAccent}</span>
    </span>
    <span className="h-2 w-2 rounded-full bg-brand-500" />
    <span className="text-[11px] uppercase tracking-[0.18em] text-brand-700/80">
      {TEXT.badgeLabel}
    </span>
  </Link>
);

const SignupImagePanel = () => (
  <div className="relative overflow-hidden aspect-5/4 sm:aspect-16/10 lg:w-[42%] lg:aspect-auto xl:w-[46%]">
    <img
      src="/signupImage.jpg"
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    />
  </div>
);

export default function SignupForm() {
  const [form] = Form.useForm<SignupFormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] =
    useState<SubmissionFeedback>(null);

  const watchedCity = Form.useWatch('city', form);
  const selectedCity = isCityName(watchedCity) ? watchedCity : undefined;
  const locationOptions = getLocationOptionsForCity(selectedCity);

  const handlePasswordKeyEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    setIsCapsLockOn(getCapsLockState(event));
  };

  const handleValuesChange: FormProps<SignupFormValues>['onValuesChange'] = (
    changedValues,
  ) => {
    if (submissionFeedback) {
      setSubmissionFeedback(null);
    }

    if ('city' in changedValues) {
      form.setFieldsValue({location: undefined});
      form.setFields([{name: 'location', errors: []}]);
    }

    if ('email' in changedValues) {
      form.setFields([{name: 'email', errors: []}]);
    }

    if ('phone' in changedValues) {
      form.setFields([{name: 'phone', errors: []}]);
    }

    if ('password' in changedValues && form.getFieldValue('confirmPassword')) {
      void form.validateFields(['confirmPassword']);
    }
  };

  const handleSubmit: FormProps<SignupFormValues>['onFinish'] = async (
    values,
  ) => {
    setSubmissionFeedback(null);
    setIsSubmitting(true);

    try {
      const payload = buildSignupPayload(values);
      const response = await signupWithMockAuth(payload);

      form.resetFields();
      setSubmissionFeedback({
        type: 'success',
        message: `${TEXT.successPrefix} ${response.record.fullName}. ${TEXT.successSuffix}`,
      });
    } catch (error) {
      const message = getSignupErrorMessage(error);

      if (isMockAuthError(error)) {
        if (error.code === 'EMAIL_EXISTS') {
          form.setFields([{name: 'email', errors: [message]}]);
        }

        if (error.code === 'PHONE_EXISTS') {
          form.setFields([{name: 'phone', errors: [message]}]);
        }
      }

      setSubmissionFeedback({type: 'error', message});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={sectionClasses}>
      <div className={backgroundGlowClasses} />

      <div className="relative mx-auto max-w-7xl">
        <div className={cardShellClasses}>
          <div className="flex flex-col lg:flex-row">
            <SignupImagePanel />

            <div className="lg:w-[58%] xl:w-[54%]">
              <div className="px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                <SignupBrandBadge />

                <div className="mt-8">
                  <span className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                    {TEXT.eyebrow}
                  </span>
                  <h1 className="mt-3 font-poppins text-3xl font-extrabold leading-tight text-text-strong sm:text-4xl">
                    {TEXT.title}
                  </h1>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-text-strong/75 sm:text-base">
                    {TEXT.intro}
                  </p>
                </div>

                <div className="mt-8 w-full max-w-2xl">
                  <div className="space-y-5">
                    {submissionFeedback ? (
                      <Alert
                        type={submissionFeedback.type}
                        showIcon
                        title={submissionFeedback.message}
                        className={
                          submissionFeedback.type === 'error'
                            ? errorAlertClasses
                            : successAlertClasses
                        }
                      />
                    ) : null}

                    <Form<SignupFormValues>
                      form={form}
                      layout="vertical"
                      requiredMark={false}
                      initialValues={DEFAULT_FORM_VALUES}
                      onFinish={handleSubmit}
                      onValuesChange={handleValuesChange}
                      autoComplete="on"
                      scrollToFirstError
                      className={formClasses}
                    >
                      <div className="grid gap-5 md:grid-cols-2">
                        <Form.Item
                          label={TEXT.fullNameLabel}
                          name="fullName"
                          normalize={normalizeFullName}
                          validateFirst
                          rules={[
                            {
                              required: true,
                              message: VALIDATION.fullNameRequired,
                            },
                            {validator: validateFullName},
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder={TEXT.fullNamePlaceholder}
                            prefix={<UserOutlined className="text-brand-500" />}
                            autoComplete="name"
                            allowClear
                            maxLength={FULL_NAME_MAX_LENGTH}
                            disabled={isSubmitting}
                            className={inputClasses}
                          />
                        </Form.Item>

                        <Form.Item
                          label={TEXT.phoneLabel}
                          name="phone"
                          normalize={sanitizePhoneInput}
                          validateFirst
                          rules={[
                            {required: true, message: VALIDATION.phoneRequired},
                            {validator: validatePhone},
                          ]}
                          extra={TEXT.phoneHint}
                        >
                          <Input
                            size="large"
                            placeholder={TEXT.phonePlaceholder}
                            prefix={
                              <PhoneOutlined className="text-brand-500" />
                            }
                            autoComplete="tel"
                            allowClear
                            disabled={isSubmitting}
                            className={inputClasses}
                          />
                        </Form.Item>

                        <Form.Item
                          label={TEXT.emailLabel}
                          name="email"
                          normalize={normalizeEmail}
                          validateFirst
                          rules={[
                            {required: true, message: VALIDATION.emailRequired},
                            {
                              type: 'email' as const,
                              message: VALIDATION.emailInvalid,
                            },
                            {validator: validateEmail},
                          ]}
                        >
                          <Input
                            size="large"
                            type="email"
                            placeholder={TEXT.emailPlaceholder}
                            prefix={<MailOutlined className="text-brand-500" />}
                            autoComplete="email"
                            allowClear
                            maxLength={EMAIL_MAX_LENGTH}
                            disabled={isSubmitting}
                            className={inputClasses}
                          />
                        </Form.Item>

                        <Form.Item
                          label={TEXT.genderLabel}
                          name="gender"
                          rules={[
                            {
                              required: true,
                              message: VALIDATION.genderRequired,
                            },
                          ]}
                        >
                          <Select
                            size="large"
                            placeholder={TEXT.genderPlaceholder}
                            options={GENDER_OPTIONS}
                            allowClear
                            showSearch
                            optionFilterProp="label"
                            disabled={isSubmitting}
                            className={selectClasses}
                          />
                        </Form.Item>

                        <Form.Item
                          label={TEXT.cityLabel}
                          name="city"
                          rules={[
                            {required: true, message: VALIDATION.cityRequired},
                          ]}
                        >
                          <Select
                            size="large"
                            placeholder={TEXT.cityPlaceholder}
                            options={SIGNUP_CITY_OPTIONS}
                            allowClear
                            showSearch
                            optionFilterProp="label"
                            disabled={isSubmitting}
                            notFoundContent={TEXT.noCityMatch}
                            className={selectClasses}
                          />
                        </Form.Item>

                        <Form.Item
                          label={TEXT.locationLabel}
                          name="location"
                          validateFirst
                          rules={[
                            {
                              required: true,
                              message: VALIDATION.locationRequired,
                            },
                            {
                              validator: async (_: unknown, value?: string) => {
                                if (!value) {
                                  return;
                                }

                                const city = form.getFieldValue('city');

                                if (
                                  !isCityName(city) ||
                                  !isLocationForCity(city, value)
                                ) {
                                  throw new Error(VALIDATION.locationInvalid);
                                }
                              },
                            },
                          ]}
                        >
                          <Select
                            size="large"
                            placeholder={
                              selectedCity
                                ? TEXT.locationPlaceholder
                                : TEXT.locationDisabledPlaceholder
                            }
                            options={locationOptions}
                            allowClear
                            showSearch
                            optionFilterProp="label"
                            disabled={isSubmitting || !selectedCity}
                            notFoundContent={TEXT.noLocationMatch}
                            className={selectClasses}
                          />
                        </Form.Item>

                        <Form.Item
                          label={TEXT.passwordLabel}
                          name="password"
                          validateFirst
                          rules={[
                            {
                              required: true,
                              message: VALIDATION.passwordRequired,
                            },
                            {validator: validatePassword},
                          ]}
                          extra={
                            <span className="text-xs font-medium text-text-strong/70">
                              {isCapsLockOn
                                ? TEXT.capsLockWarning
                                : TEXT.passwordHint}
                            </span>
                          }
                        >
                          <Input.Password
                            size="large"
                            placeholder={TEXT.passwordPlaceholder}
                            prefix={<LockOutlined className="text-brand-500" />}
                            autoComplete="new-password"
                            maxLength={PASSWORD_MAX_LENGTH}
                            disabled={isSubmitting}
                            className={inputClasses}
                            onKeyUp={handlePasswordKeyEvent}
                            onKeyDown={handlePasswordKeyEvent}
                          />
                        </Form.Item>

                        <Form.Item
                          label={TEXT.confirmPasswordLabel}
                          name="confirmPassword"
                          dependencies={['password']}
                          validateFirst
                          rules={[
                            {
                              required: true,
                              message: VALIDATION.confirmPasswordRequired,
                            },
                            {
                              validator: async (_: unknown, value?: string) => {
                                if (!value) {
                                  return;
                                }

                                if (value !== form.getFieldValue('password')) {
                                  throw new Error(
                                    VALIDATION.confirmPasswordMismatch,
                                  );
                                }
                              },
                            },
                          ]}
                        >
                          <Input.Password
                            size="large"
                            placeholder={TEXT.confirmPasswordPlaceholder}
                            prefix={<LockOutlined className="text-brand-500" />}
                            autoComplete="new-password"
                            maxLength={PASSWORD_MAX_LENGTH}
                            disabled={isSubmitting}
                            className={inputClasses}
                            onKeyUp={handlePasswordKeyEvent}
                            onKeyDown={handlePasswordKeyEvent}
                          />
                        </Form.Item>
                      </div>

                      <Form.Item className="mt-7!">
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={isSubmitting}
                          disabled={isSubmitting}
                          block
                          className={primaryButtonClasses}
                        >
                          {isSubmitting ? TEXT.submitting : TEXT.submit}
                        </Button>
                      </Form.Item>
                    </Form>

                    <p className="mt-6 text-sm leading-6 text-text-strong/70">
                      {TEXT.termsIntro}{' '}
                      <a href="#" className={linkClasses}>
                        {TEXT.termsOfService}
                      </a>{' '}
                      and{' '}
                      <a href="#" className={linkClasses}>
                        {TEXT.privacyPolicy}
                      </a>
                      .
                    </p>

                    <p className="mt-5 text-sm text-text-strong/70">
                      {TEXT.loginPrompt}{' '}
                      <Link to="/login" className={linkClasses}>
                        {TEXT.loginCta}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
