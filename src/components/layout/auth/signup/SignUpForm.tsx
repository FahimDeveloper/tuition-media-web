import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Alert, Button, Form, Input } from "antd";
import type { FormInstance, FormProps } from "antd";
import { type KeyboardEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ChevronLeftIcon } from "@/icons";
import { useAppDispatch } from "@/hooks/useAppHooks";
import { useRegistrationMutation } from "@/redux/features/auth/authApi";
import { loggedInUser } from "@/redux/features/auth/authSlice";
import type { RegistrationPayload } from "@/types";
import { getApiErrorMessage, getApiErrorPayload } from "@/utils/api-error.utils";
import { isCapsLockActive, normalizeEmail } from "@/utils/auth-form.utils";
import {
  isValidBangladeshiPhoneNumber,
  normalizeBangladeshiPhoneNumber,
  sanitizePhoneInput,
} from "@/utils/phone.utils";
import { isRecord } from "@/utils/type-guards.utils";

import {
  authFormClasses,
  authInputClasses,
  authLinkClasses,
  authPrimaryButtonClasses,
} from "../formStyles";

type SignupFormValues = {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type SignupFieldError = {
  name: keyof SignupFormValues;
  errors: string[];
};

const SIGNUP_LIMITS = {
  nameMinLength: 2,
  nameMaxLength: 80,
  emailMaxLength: 100,
  passwordMinLength: 8,
  passwordMaxLength: 128,
} as const;

const SIGNUP_COPY = {
  title: "Sign Up",
  description: "Enter your information to create your teacher account.",
  phoneHint:
    "Use a Bangladeshi mobile number, for example 01XXXXXXXXX or +8801XXXXXXXXX.",
  passwordHint: "",
  capsLockWarning: "Caps Lock is on.",
  submit: "Sign Up",
  submitting: "Creating account...",
  genericError: "Something went wrong. Please try again.",
} as const;

const SIGNUP_MESSAGES = {
  fullNameRequired: "Please enter your full name.",
  fullNameTooShort: "Full name must be at least 2 characters.",
  fullNameTooLong: "Full name is too long.",
  fullNameInvalid:
    "Use letters and common name characters only, such as spaces, dots, apostrophes, or hyphens.",

  emailRequired: "Please enter your email.",
  emailInvalid: "Please enter a valid email address.",
  emailSpaces: "Email cannot contain spaces.",
  emailTooLong: "Email is too long.",

  phoneRequired: "Please enter your phone number.",
  phoneInvalid: "Enter a valid Bangladeshi mobile number.",

  passwordRequired: "Please create a password.",
  passwordTooShort: "Password must be at least 8 characters.",
  passwordTooLong: "Password is too long.",
  passwordNeedsLetterAndNumber:
    "Password must include at least one letter and one number.",

  confirmPasswordRequired: "Please confirm your password.",
  confirmPasswordMismatch: "Passwords do not match.",
} as const;

const NAME_PATTERN = /^(?=.*\p{L})[\p{L} .'-]+$/u;
const EMAIL_NO_SPACES_PATTERN = /^\S+$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).+$/;
const DEFAULT_VALUES: SignupFormValues = {
  full_name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const SERVER_FIELD_NAME_MAP: Partial<Record<string, keyof SignupFormValues>> = {
  full_name: "full_name",
  fullName: "full_name",
  fullname: "full_name",
  name: "full_name",
  email: "email",
  phone: "phone",
  phone_number: "phone",
  password: "password",
  confirmPassword: "confirmPassword",
  confirm_password: "confirmPassword",
};

const normalizeWhitespace = (value: string) =>
  value.trim().replace(/\s+/g, " ");

const normalizeName = (value: unknown) =>
  typeof value === "string" ? normalizeWhitespace(value) : "";

const normalizeNameInput = (value: unknown) =>
  typeof value === "string" ? value.replace(/\s{2,}/g, " ") : "";

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
      typeof fieldError.path === "string"
        ? (SERVER_FIELD_NAME_MAP[fieldError.path] ?? null)
        : null;

    const message =
      typeof fieldError.message === "string" ? fieldError.message : undefined;

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

  form.setFields(fieldNames.map((name) => ({ name, errors: [] })));
};

const buildRegistrationPayload = (
  values: SignupFormValues,
): RegistrationPayload => {
  /**
   * RTK Query integration point.
   *
   * Keep backend field mapping here.
   * If your backend changes field names later, update only this function.
   *
   * confirmPassword is intentionally not included because it is only needed
   * for frontend validation.
   */
  return {
    full_name: normalizeName(values.full_name),
    email: normalizeEmail(values.email),
    phone: normalizeBangladeshiPhoneNumber(values.phone),
    password: values.password,
  } as RegistrationPayload;
};

const fullNameRules = [
  { required: true, message: SIGNUP_MESSAGES.fullNameRequired },
  {
    min: SIGNUP_LIMITS.nameMinLength,
    message: SIGNUP_MESSAGES.fullNameTooShort,
  },
  {
    max: SIGNUP_LIMITS.nameMaxLength,
    message: SIGNUP_MESSAGES.fullNameTooLong,
  },
  { pattern: NAME_PATTERN, message: SIGNUP_MESSAGES.fullNameInvalid },
];

const emailRules = [
  { required: true, message: SIGNUP_MESSAGES.emailRequired },
  { type: "email" as const, message: SIGNUP_MESSAGES.emailInvalid },
  { max: SIGNUP_LIMITS.emailMaxLength, message: SIGNUP_MESSAGES.emailTooLong },
  { pattern: EMAIL_NO_SPACES_PATTERN, message: SIGNUP_MESSAGES.emailSpaces },
];

const phoneRules = [
  { required: true, message: SIGNUP_MESSAGES.phoneRequired },
  {
    validator: async (_: unknown, value?: string) => {
      if (!value || isValidBangladeshiPhoneNumber(value)) {
        return;
      }

      throw new Error(SIGNUP_MESSAGES.phoneInvalid);
    },
  },
];

const passwordRules = [
  { required: true, message: SIGNUP_MESSAGES.passwordRequired },
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
  const [registerTeacher, { isLoading }] = useRegistrationMutation();

  const [errorMessage, setErrorMessage] = useState("");
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePasswordKeyEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    setIsCapsLockOn(isCapsLockActive(event));
  };

  const handleValuesChange: FormProps<SignupFormValues>["onValuesChange"] = (
    changedValues,
  ) => {
    if (errorMessage) {
      setErrorMessage("");
    }

    const changedFieldNames = Object.keys(changedValues) as Array<
      keyof SignupFormValues
    >;

    clearFieldErrors(form, changedFieldNames);

    /**
     * If the user changes password after typing confirm password,
     * re-check confirm password immediately.
     */
    if ("password" in changedValues && form.getFieldValue("confirmPassword")) {
      void form.validateFields(["confirmPassword"]);
    }
  };

  const confirmPasswordRules = [
    { required: true, message: SIGNUP_MESSAGES.confirmPasswordRequired },
    {
      validator: async (_: unknown, value?: string) => {
        if (!value || value === form.getFieldValue("password")) {
          return;
        }

        throw new Error(SIGNUP_MESSAGES.confirmPasswordMismatch);
      },
    },
  ];

  const handleSubmit: FormProps<SignupFormValues>["onFinish"] = async (
    values,
  ) => {
    setErrorMessage("");

    try {
      /**
       * RTK Query mutation flow:
       * 1. Build clean API payload.
       * 2. Call mutation.
       * 3. Use unwrap() so API errors go to catch block.
       */
      const payload = buildRegistrationPayload(values);
      const response = await registerTeacher(payload).unwrap();

      /**
       * Keep this if your signup API returns logged-in user data.
       * If your API only creates the account, remove this dispatch
       * and navigate to `/login` instead.
       */
      dispatch(loggedInUser(response.results));
      navigate("/tutor", { replace: true });
    } catch (error) {
      const fieldErrors = getApiFieldErrors(error);

      if (fieldErrors.length > 0) {
        form.setFields(fieldErrors);
      }

      setErrorMessage(getApiErrorMessage(error, SIGNUP_COPY.genericError));
    }
  };

  return (
    <div className="no-scrollbar flex w-full flex-1 flex-col overflow-y-auto px-6 py-10 sm:px-10 lg:px-12">
      <div className="mx-auto mb-4 w-full max-w-2xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to Home
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center pb-4">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-title-sm sm:text-title-md mb-2 font-semibold text-gray-800 dark:text-white/90">
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
              label="Full Name"
              name="full_name"
              normalize={normalizeNameInput}
              validateFirst
              rules={fullNameRules}
              className="sm:col-span-2"
            >
              <Input
                size="large"
                placeholder="Enter your full name"
                prefix={<UserOutlined className="text-brand-500" />}
                autoComplete="name"
                allowClear
                maxLength={SIGNUP_LIMITS.nameMaxLength}
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

            <Form.Item
              label="Phone Number"
              name="phone"
              normalize={sanitizePhoneInput}
              validateFirst
              rules={phoneRules}
              extra="Use a bangladeshi phone number"
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
              dependencies={["password"]}
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

          <Form.Item className="mt-4! mb-0!">
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

        <p className="mt-5 text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className={authLinkClasses}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
