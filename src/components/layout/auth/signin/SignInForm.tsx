import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import type { FormProps } from "antd";
import { type KeyboardEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@/icons";
import { useAppDispatch } from "@/hooks/useAppHooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { loggedInUser } from "@/redux/features/auth/authSlice";
import type { LoginPayload } from "@/types";
import { getApiErrorMessage, isRecord } from "@/utils/api-error.utils";
import { isCapsLockActive, normalizeEmail } from "@/utils/auth-form.utils";
import {
  authFormClasses,
  authInputClasses,
  authLinkClasses,
  authPrimaryButtonClasses,
} from "../formStyles";

type SignInFormValues = LoginPayload;

const EMAIL_MAX_LENGTH = 100;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 128;
const EMAIL_NO_SPACES_PATTERN = /^\S+$/;

const DEFAULT_VALUES: SignInFormValues = {
  email: "",
  password: "",
};

const emailRules = [
  { required: true, message: "Please enter your email." },
  { type: "email" as const, message: "Please enter a valid email address." },
  { max: EMAIL_MAX_LENGTH, message: "Email is too long." },
  { pattern: EMAIL_NO_SPACES_PATTERN, message: "Email cannot contain spaces." },
];

const passwordRules = [
  { required: true, message: "Please enter your password." },
  {
    min: PASSWORD_MIN_LENGTH,
    message: "Password must be at least 6 characters.",
  },
  { max: PASSWORD_MAX_LENGTH, message: "Password is too long." },
  {
    validator: async (_: unknown, value?: string) => {
      if (!value || value.trim()) {
        return;
      }

      throw new Error("Password cannot be only spaces.");
    },
  },
];

const getLoginErrorMessage = (error: unknown) => {
  if (isRecord(error) && error.status === 401) {
    return "Incorrect email or password.";
  }

  return getApiErrorMessage(error);
};

export default function SignInForm() {
  const [form] = Form.useForm<SignInFormValues>();
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePasswordKeyEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    setIsCapsLockOn(isCapsLockActive(event));
  };

  const handleValuesChange: FormProps<SignInFormValues>["onValuesChange"] =
    () => {
      if (errorMessage) {
        setErrorMessage("");
      }
    };

  const handleSubmit: FormProps<SignInFormValues>["onFinish"] = async (
    values,
  ) => {
    setErrorMessage("");

    try {
      const response = await login({
        email: normalizeEmail(values.email),
        password: values.password,
      }).unwrap();

      dispatch(loggedInUser(response.results));
      form.resetFields(["password"]);
      navigate("/tutor", { replace: true });
    } catch (error) {
      setErrorMessage(getLoginErrorMessage(error));
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col px-6 py-10 sm:px-10 lg:px-12">
      <div className="mx-auto w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to Home
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-title-sm sm:text-title-md mb-2 font-semibold text-gray-800 dark:text-white/90">
            Sign In
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your email and password to sign in.
          </p>
        </div>

        {errorMessage ? (
          <Alert
            type="error"
            showIcon
            message={errorMessage}
            className="mb-5! rounded-lg! border! border-red-200! bg-red-50/90! dark:border-red-500/30! dark:bg-red-500/12!"
          />
        ) : null}

        <Form<SignInFormValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={DEFAULT_VALUES}
          onFinish={handleSubmit}
          onValuesChange={handleValuesChange}
          autoComplete="on"
          className={authFormClasses}
        >
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
              placeholder="info@gmail.com"
              prefix={<MailOutlined className="text-brand-500" />}
              autoComplete="email"
              allowClear
              maxLength={EMAIL_MAX_LENGTH}
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
              isCapsLockOn ? (
                <span className="text-amber-700">Caps Lock is on.</span>
              ) : null
            }
          >
            <Input.Password
              size="large"
              placeholder="Enter your password"
              prefix={<LockOutlined className="text-brand-500" />}
              autoComplete="current-password"
              disabled={isLoading}
              className={authInputClasses}
              onKeyUp={handlePasswordKeyEvent}
              onKeyDown={handlePasswordKeyEvent}
            />
          </Form.Item>

          <Form.Item className="mb-0!">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={isLoading}
              block
              className={authPrimaryButtonClasses}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </Form.Item>
        </Form>

        <p className="mt-5 text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className={authLinkClasses}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
