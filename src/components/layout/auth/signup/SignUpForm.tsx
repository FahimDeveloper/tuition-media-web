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
import { isCapsLockActive } from "@/utils/keyboard.utils";
import {
  normalizeBangladeshiPhoneNumber,
  sanitizePhoneInput,
} from "@/utils/phone.utils";
import {
  normalizeEmail,
  normalizeName,
  normalizeNameInput,
} from "@/utils/string.utils";
import { isRecord } from "@/utils/type-guards.utils";
import {
  AUTH_FORM_LIMITS,
  SIGN_UP_COPY,
  SIGN_UP_INITIAL_VALUES,
  SIGN_UP_MESSAGES,
  signUpEmailRules,
  signUpFullNameRules,
  signUpPasswordRules,
  signUpPhoneRules,
  type SignUpFormValues,
} from "@/validations/auth.validation";

import {
  authFormClasses,
  authInputClasses,
  authLinkClasses,
  authPrimaryButtonClasses,
} from "../formStyles";

type SignupFieldError = {
  name: keyof SignUpFormValues;
  errors: string[];
};

const SERVER_FIELD_NAME_MAP: Partial<Record<string, keyof SignUpFormValues>> = {
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

  const fieldErrors = new Map<keyof SignUpFormValues, string[]>();

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
  form: FormInstance<SignUpFormValues>,
  fieldNames: Array<keyof SignUpFormValues>,
) => {
  if (fieldNames.length === 0) {
    return;
  }

  form.setFields(fieldNames.map((name) => ({ name, errors: [] })));
};

const buildRegistrationPayload = (
  values: SignUpFormValues,
): RegistrationPayload => {
  return {
    full_name: normalizeName(values.full_name),
    email: normalizeEmail(values.email),
    phone: normalizeBangladeshiPhoneNumber(values.phone),
    password: values.password,
  } as RegistrationPayload;
};

export default function SignUpForm() {
  const [form] = Form.useForm<SignUpFormValues>();
  const [registerTeacher, { isLoading }] = useRegistrationMutation();

  const [errorMessage, setErrorMessage] = useState("");
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePasswordKeyEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    setIsCapsLockOn(isCapsLockActive(event));
  };

  const handleValuesChange: FormProps<SignUpFormValues>["onValuesChange"] = (
    changedValues,
  ) => {
    if (errorMessage) {
      setErrorMessage("");
    }

    const changedFieldNames = Object.keys(changedValues) as Array<
      keyof SignUpFormValues
    >;

    clearFieldErrors(form, changedFieldNames);

    if ("password" in changedValues && form.getFieldValue("confirmPassword")) {
      void form.validateFields(["confirmPassword"]);
    }
  };

  const confirmPasswordRules = [
    { required: true, message: SIGN_UP_MESSAGES.confirmPasswordRequired },
    {
      validator: async (_: unknown, value?: string) => {
        if (!value || value === form.getFieldValue("password")) {
          return;
        }

        throw new Error(SIGN_UP_MESSAGES.confirmPasswordMismatch);
      },
    },
  ];

  const handleSubmit: FormProps<SignUpFormValues>["onFinish"] = async (
    values,
  ) => {
    setErrorMessage("");

    try {
      const payload = buildRegistrationPayload(values);
      const response = await registerTeacher(payload).unwrap();

      dispatch(loggedInUser(response.results));
      navigate("/tutor", { replace: true });
    } catch (error) {
      const fieldErrors = getApiFieldErrors(error);

      if (fieldErrors.length > 0) {
        form.setFields(fieldErrors);
      }

      setErrorMessage(getApiErrorMessage(error, SIGN_UP_COPY.genericError));
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
            {SIGN_UP_COPY.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {SIGN_UP_COPY.description}
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

        <Form<SignUpFormValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={SIGN_UP_INITIAL_VALUES}
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
              rules={signUpFullNameRules}
              className="sm:col-span-2"
            >
              <Input
                size="large"
                placeholder="Enter your full name"
                prefix={<UserOutlined className="text-brand-500" />}
                autoComplete="name"
                allowClear
                maxLength={AUTH_FORM_LIMITS.fullNameMaxLength}
                disabled={isLoading}
                className={authInputClasses}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              normalize={normalizeEmail}
              validateFirst
              rules={signUpEmailRules}
            >
              <Input
                size="large"
                type="email"
                placeholder="Enter your email"
                prefix={<MailOutlined className="text-brand-500" />}
                autoComplete="email"
                allowClear
                maxLength={AUTH_FORM_LIMITS.emailMaxLength}
                disabled={isLoading}
                className={authInputClasses}
              />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              normalize={sanitizePhoneInput}
              validateFirst
              rules={signUpPhoneRules}
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
              rules={signUpPasswordRules}
              extra={
                isCapsLockOn
                  ? SIGN_UP_COPY.capsLockWarning
                  : SIGN_UP_COPY.passwordHint
              }
            >
              <Input.Password
                size="large"
                placeholder="Create a password"
                prefix={<LockOutlined className="text-brand-500" />}
                autoComplete="new-password"
                maxLength={AUTH_FORM_LIMITS.passwordMaxLength}
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
                  ? SIGN_UP_COPY.capsLockWarning
                  : SIGN_UP_COPY.passwordHint
              }
            >
              <Input.Password
                size="large"
                placeholder="Re-enter your password"
                prefix={<LockOutlined className="text-brand-500" />}
                autoComplete="new-password"
                maxLength={AUTH_FORM_LIMITS.passwordMaxLength}
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
              {isLoading ? SIGN_UP_COPY.submitting : SIGN_UP_COPY.submit}
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
