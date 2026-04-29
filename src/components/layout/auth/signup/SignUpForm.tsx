import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Alert, Button, Form, Input, Select} from 'antd';
import type {FormInstance, FormProps} from 'antd';
import {type KeyboardEvent, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {ChevronLeftIcon} from '@/icons';
import {useAppDispatch} from '@/hooks/useAppHooks';
import {useRegistrationMutation} from '@/redux/features/auth/authApi';
import {loggedInUser} from '@/redux/features/auth/authSlice';
import type {
  AuthGender,
  RegistrationPayload,
} from '@/redux/features/auth/auth.types';
import {
  authFormClasses,
  authInputClasses,
  authLinkClasses,
  authPrimaryButtonClasses,
  authSelectClasses,
} from '../formStyles';
import {
  GENDER_OPTIONS,
  getLocationOptionsForCity,
  isCityName,
  isLocationForCity,
  SIGNUP_CITY_OPTIONS,
} from './options';

type SignupFormValues = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  gender?: AuthGender;
  city?: string;
  location?: string;
  password: string;
  confirmPassword: string;
};

type SignupFieldError = {
  name: keyof SignupFormValues;
  errors: string[];
};

type ApiErrorPayload = {
  message?: unknown;
  errorSources?: unknown;
  errors?: unknown;
};

const SIGNUP_LIMITS = {
  nameMinLength: 2,
  nameMaxLength: 80,
  emailMaxLength: 100,
  passwordMinLength: 8,
  passwordMaxLength: 128,
} as const;

const SIGNUP_COPY = {
  title: 'Sign Up',
  description: 'Enter your information to create your teacher account.',
  phoneHint: 'Use a Bangladeshi mobile number.',
  genderPlaceholder: 'Select gender',
  cityPlaceholder: 'Select city',
  locationPlaceholder: 'Select location',
  locationDisabledPlaceholder: 'Select a city first',
  passwordHint: '',
  capsLockWarning: 'Caps Lock is on.',
  submit: 'Sign Up',
  submitting: 'Creating account...',
  noCityMatch: 'No matching city found.',
  noLocationMatch: 'No matching location found.',
  genericError: 'Something went wrong. Please try again.',
} as const;

const SIGNUP_MESSAGES = {
  firstNameRequired: 'Please enter your first name.',
  firstNameTooShort: 'First name must be at least 2 characters.',
  firstNameTooLong: 'First name is too long.',
  firstNameInvalid:
    'Use letters and common name characters only, such as spaces, dots, apostrophes, or hyphens.',
  lastNameRequired: 'Please enter your last name.',
  lastNameTooShort: 'Last name must be at least 2 characters.',
  lastNameTooLong: 'Last name is too long.',
  lastNameInvalid:
    'Use letters and common name characters only, such as spaces, dots, apostrophes, or hyphens.',
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
  passwordTooShort: 'Password must be at least 8 characters.',
  passwordTooLong: 'Password is too long.',
  passwordNeedsLetterAndNumber:
    'Password must include at least one letter and one number.',
  confirmPasswordRequired: 'Please confirm your password.',
  confirmPasswordMismatch: 'Passwords do not match.',
} as const;

const NAME_PATTERN = /^(?=.*\p{L})[\p{L} .'-]+$/u;
const EMAIL_NO_SPACES_PATTERN = /^\S+$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).+$/;
const BANGLADESHI_PHONE_PATTERN = /^(?:\+8801\d{9}|01\d{9})$/;

const DEFAULT_VALUES: SignupFormValues = {
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  gender: undefined,
  city: undefined,
  location: undefined,
  password: '',
  confirmPassword: '',
};

const SERVER_FIELD_NAME_MAP: Partial<Record<string, keyof SignupFormValues>> = {
  first_name: 'first_name',
  firstName: 'first_name',
  last_name: 'last_name',
  lastName: 'last_name',
  phone: 'phone',
  email: 'email',
  gender: 'gender',
  city: 'city',
  location: 'location',
  password: 'password',
  confirmPassword: 'confirmPassword',
  confirm_password: 'confirmPassword',
};

const normalizeWhitespace = (value: string) =>
  value.trim().replace(/\s+/g, ' ');

const normalizeName = (value: unknown) =>
  typeof value === 'string' ? normalizeWhitespace(value) : '';

const normalizeEmail = (value: unknown) =>
  typeof value === 'string' ? value.trim().toLowerCase() : '';

const sanitizePhoneInput = (value: unknown) =>
  typeof value === 'string' ? value.replace(/[^\d+\s()-]/g, '') : '';

const stripPhoneFormatting = (value: string) =>
  value.replace(/[()\s-]/g, '').trim();

const normalizePhoneNumber = (value: string) => {
  const cleaned = stripPhoneFormatting(value);
  return cleaned.startsWith('01') ? `+88${cleaned}` : cleaned;
};

const isValidBangladeshiPhone = (value: string) =>
  BANGLADESHI_PHONE_PATTERN.test(stripPhoneFormatting(value));

const isCapsLockActive = (event: KeyboardEvent<HTMLInputElement>) =>
  Boolean(event.getModifierState?.('CapsLock'));

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const getApiErrorPayload = (error: unknown): ApiErrorPayload | null => {
  if (!isRecord(error) || !('data' in error) || !isRecord(error.data)) {
    return null;
  }

  return error.data;
};

const getApiErrorMessage = (error: unknown) => {
  const payload = getApiErrorPayload(error);

  if (typeof payload?.message === 'string' && payload.message.trim()) {
    return payload.message;
  }

  if (isRecord(error) && typeof error.message === 'string' && error.message) {
    return error.message;
  }

  return SIGNUP_COPY.genericError;
};

const getApiFieldErrors = (error: unknown): SignupFieldError[] => {
  const payload = getApiErrorPayload(error);

  if (!payload) {
    return [];
  }

  const rawFieldErrors = Array.isArray(payload.errorSources)
    ? payload.errorSources
    : Array.isArray(payload.errors)
      ? payload.errors
      : [];

  const fieldErrors = new Map<keyof SignupFormValues, string[]>();

  for (const fieldError of rawFieldErrors) {
    if (!isRecord(fieldError)) {
      continue;
    }

    const fieldName =
      typeof fieldError.path === 'string'
        ? (SERVER_FIELD_NAME_MAP[fieldError.path] ?? null)
        : null;
    const message =
      typeof fieldError.message === 'string' ? fieldError.message : undefined;

    if (!fieldName || !message) {
      continue;
    }

    fieldErrors.set(fieldName, [
      ...(fieldErrors.get(fieldName) ?? []),
      message,
    ]);
  }

  return Array.from(fieldErrors.entries()).map(([name, errors]) => ({
    name,
    errors,
  }));
};

const clearFieldErrors = (
  form: FormInstance<SignupFormValues>,
  fieldNames: Array<keyof SignupFormValues>,
) => {
  if (fieldNames.length === 0) {
    return;
  }

  form.setFields(fieldNames.map((name) => ({name, errors: []})));
};

const buildRegistrationPayload = (
  values: SignupFormValues,
): RegistrationPayload => {
  if (
    !values.gender ||
    !isCityName(values.city) ||
    !values.location ||
    !isLocationForCity(values.city, values.location)
  ) {
    throw new Error(SIGNUP_COPY.genericError);
  }

  return {
    first_name: normalizeName(values.first_name),
    last_name: normalizeName(values.last_name),
    phone: normalizePhoneNumber(values.phone),
    email: normalizeEmail(values.email),
    gender: values.gender,
    city: values.city,
    location: values.location,
    password: values.password,
  };
};

const createNameRules = ({
  requiredMessage,
  tooShortMessage,
  tooLongMessage,
  invalidMessage,
}: {
  requiredMessage: string;
  tooShortMessage: string;
  tooLongMessage: string;
  invalidMessage: string;
}) => [
  {required: true, message: requiredMessage},
  {min: SIGNUP_LIMITS.nameMinLength, message: tooShortMessage},
  {max: SIGNUP_LIMITS.nameMaxLength, message: tooLongMessage},
  {pattern: NAME_PATTERN, message: invalidMessage},
];

const firstNameRules = createNameRules({
  requiredMessage: SIGNUP_MESSAGES.firstNameRequired,
  tooShortMessage: SIGNUP_MESSAGES.firstNameTooShort,
  tooLongMessage: SIGNUP_MESSAGES.firstNameTooLong,
  invalidMessage: SIGNUP_MESSAGES.firstNameInvalid,
});

const lastNameRules = createNameRules({
  requiredMessage: SIGNUP_MESSAGES.lastNameRequired,
  tooShortMessage: SIGNUP_MESSAGES.lastNameTooShort,
  tooLongMessage: SIGNUP_MESSAGES.lastNameTooLong,
  invalidMessage: SIGNUP_MESSAGES.lastNameInvalid,
});

const emailRules = [
  {required: true, message: SIGNUP_MESSAGES.emailRequired},
  {type: 'email' as const, message: SIGNUP_MESSAGES.emailInvalid},
  {max: SIGNUP_LIMITS.emailMaxLength, message: SIGNUP_MESSAGES.emailTooLong},
  {pattern: EMAIL_NO_SPACES_PATTERN, message: SIGNUP_MESSAGES.emailSpaces},
];

const phoneRules = [
  {required: true, message: SIGNUP_MESSAGES.phoneRequired},
  {
    validator: async (_: unknown, value?: string) => {
      if (!value || isValidBangladeshiPhone(value)) {
        return;
      }

      throw new Error(SIGNUP_MESSAGES.phoneInvalid);
    },
  },
];

const genderRules = [{required: true, message: SIGNUP_MESSAGES.genderRequired}];

const cityRules = [{required: true, message: SIGNUP_MESSAGES.cityRequired}];

const passwordRules = [
  {required: true, message: SIGNUP_MESSAGES.passwordRequired},
  {
    min: SIGNUP_LIMITS.passwordMinLength,
    message: SIGNUP_MESSAGES.passwordTooShort,
  },
  {
    max: SIGNUP_LIMITS.passwordMaxLength,
    message: SIGNUP_MESSAGES.passwordTooLong,
  },
  {
    pattern: PASSWORD_PATTERN,
    message: SIGNUP_MESSAGES.passwordNeedsLetterAndNumber,
  },
];

export default function SignUpForm() {
  const [form] = Form.useForm<SignupFormValues>();
  const [registerTeacher, {isLoading}] = useRegistrationMutation();
  const [errorMessage, setErrorMessage] = useState('');
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const watchedCity = Form.useWatch('city', form);
  const selectedCity = isCityName(watchedCity) ? watchedCity : undefined;
  const locationOptions = getLocationOptionsForCity(selectedCity);

  const handlePasswordKeyEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    setIsCapsLockOn(isCapsLockActive(event));
  };

  const handleValuesChange: FormProps<SignupFormValues>['onValuesChange'] = (
    changedValues,
  ) => {
    if (errorMessage) {
      setErrorMessage('');
    }

    const changedFieldNames = Object.keys(changedValues) as Array<
      keyof SignupFormValues
    >;
    clearFieldErrors(form, changedFieldNames);

    if ('city' in changedValues) {
      form.setFieldsValue({location: undefined});
      clearFieldErrors(form, ['location']);
    }

    if ('password' in changedValues && form.getFieldValue('confirmPassword')) {
      void form.validateFields(['confirmPassword']);
    }
  };

  const locationRules = [
    {required: true, message: SIGNUP_MESSAGES.locationRequired},
    {
      validator: async (_: unknown, value?: string) => {
        if (!value) {
          return;
        }

        const city = form.getFieldValue('city');

        if (!isCityName(city) || !isLocationForCity(city, value)) {
          throw new Error(SIGNUP_MESSAGES.locationInvalid);
        }
      },
    },
  ];

  const confirmPasswordRules = [
    {required: true, message: SIGNUP_MESSAGES.confirmPasswordRequired},
    {
      validator: async (_: unknown, value?: string) => {
        if (!value || value === form.getFieldValue('password')) {
          return;
        }

        throw new Error(SIGNUP_MESSAGES.confirmPasswordMismatch);
      },
    },
  ];

  const handleSubmit: FormProps<SignupFormValues>['onFinish'] = async (
    values,
  ) => {
    setErrorMessage('');

    try {
      const response = await registerTeacher(
        buildRegistrationPayload(values),
      ).unwrap();

      dispatch(loggedInUser(response.results));
      navigate('/dashboard');
    } catch (error) {
      const fieldErrors = getApiFieldErrors(error);

      if (fieldErrors.length > 0) {
        form.setFields(fieldErrors);
      }

      setErrorMessage(getApiErrorMessage(error));
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto no-scrollbar px-6 py-10 sm:px-10 lg:px-12">
      <div className="w-full max-w-2xl mx-auto mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to Home
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-2xl mx-auto pb-4">
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            {SIGNUP_COPY.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {SIGNUP_COPY.description}
          </p>
        </div>

        {errorMessage ? (
          <Alert
            type="error"
            showIcon
            title={errorMessage}
            className="mb-5! rounded-lg! border! border-red-200! bg-red-50/90! dark:border-red-500/30! dark:bg-red-500/12!"
          />
        ) : null}

        <Form<SignupFormValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={DEFAULT_VALUES}
          onFinish={handleSubmit}
          onValuesChange={handleValuesChange}
          autoComplete="on"
          scrollToFirstError
          className={authFormClasses}
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Form.Item
              label="First Name"
              name="first_name"
              normalize={normalizeName}
              validateFirst
              rules={firstNameRules}
            >
              <Input
                size="large"
                placeholder="Enter your first name"
                prefix={<UserOutlined className="text-brand-500" />}
                autoComplete="given-name"
                allowClear
                maxLength={SIGNUP_LIMITS.nameMaxLength}
                disabled={isLoading}
                className={authInputClasses}
              />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="last_name"
              normalize={normalizeName}
              validateFirst
              rules={lastNameRules}
            >
              <Input
                size="large"
                placeholder="Enter your last name"
                prefix={<UserOutlined className="text-brand-500" />}
                autoComplete="family-name"
                allowClear
                maxLength={SIGNUP_LIMITS.nameMaxLength}
                disabled={isLoading}
                className={authInputClasses}
              />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              normalize={sanitizePhoneInput}
              validateFirst
              rules={phoneRules}
              extra={SIGNUP_COPY.phoneHint}
            >
              <Input
                size="large"
                placeholder="01 or +8801"
                prefix={<PhoneOutlined className="text-brand-500" />}
                autoComplete="tel"
                allowClear
                disabled={isLoading}
                className={authInputClasses}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              normalize={normalizeEmail}
              validateFirst
              rules={emailRules}
            >
              <Input
                size="large"
                type="email"
                placeholder="Enter your email"
                prefix={<MailOutlined className="text-brand-500" />}
                autoComplete="email"
                allowClear
                maxLength={SIGNUP_LIMITS.emailMaxLength}
                disabled={isLoading}
                className={authInputClasses}
              />
            </Form.Item>

            <Form.Item label="Gender" name="gender" rules={genderRules}>
              <Select
                size="large"
                placeholder={SIGNUP_COPY.genderPlaceholder}
                options={GENDER_OPTIONS}
                allowClear
                showSearch
                optionFilterProp="label"
                disabled={isLoading}
                className={authSelectClasses}
              />
            </Form.Item>

            <Form.Item label="City" name="city" rules={cityRules}>
              <Select
                size="large"
                placeholder={SIGNUP_COPY.cityPlaceholder}
                options={SIGNUP_CITY_OPTIONS}
                allowClear
                showSearch
                optionFilterProp="label"
                disabled={isLoading}
                notFoundContent={SIGNUP_COPY.noCityMatch}
                className={authSelectClasses}
              />
            </Form.Item>

            <Form.Item
              label="Location"
              name="location"
              validateFirst
              rules={locationRules}
              className="sm:col-span-2"
            >
              <Select
                size="large"
                placeholder={
                  selectedCity
                    ? SIGNUP_COPY.locationPlaceholder
                    : SIGNUP_COPY.locationDisabledPlaceholder
                }
                options={locationOptions}
                allowClear
                showSearch
                optionFilterProp="label"
                disabled={isLoading || !selectedCity}
                notFoundContent={SIGNUP_COPY.noLocationMatch}
                className={authSelectClasses}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              validateFirst
              rules={passwordRules}
              extra={
                isCapsLockOn
                  ? SIGNUP_COPY.capsLockWarning
                  : SIGNUP_COPY.passwordHint
              }
            >
              <Input.Password
                size="large"
                placeholder="Create a password"
                prefix={<LockOutlined className="text-brand-500" />}
                autoComplete="new-password"
                maxLength={SIGNUP_LIMITS.passwordMaxLength}
                disabled={isLoading}
                className={authInputClasses}
                onKeyUp={handlePasswordKeyEvent}
                onKeyDown={handlePasswordKeyEvent}
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              validateFirst
              rules={confirmPasswordRules}
              extra={
                isCapsLockOn
                  ? SIGNUP_COPY.capsLockWarning
                  : SIGNUP_COPY.passwordHint
              }
            >
              <Input.Password
                size="large"
                placeholder="Re-enter your password"
                prefix={<LockOutlined className="text-brand-500" />}
                autoComplete="new-password"
                maxLength={SIGNUP_LIMITS.passwordMaxLength}
                disabled={isLoading}
                className={authInputClasses}
                onKeyUp={handlePasswordKeyEvent}
                onKeyDown={handlePasswordKeyEvent}
              />
            </Form.Item>
          </div>

          <Form.Item className="mb-0! mt-4!">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={isLoading}
              block
              className={authPrimaryButtonClasses}
            >
              {isLoading ? SIGNUP_COPY.submitting : SIGNUP_COPY.submit}
            </Button>
          </Form.Item>
        </Form>

        <p className="mt-5 text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
          Already have an account?{' '}
          <Link to="/login" className={authLinkClasses}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
