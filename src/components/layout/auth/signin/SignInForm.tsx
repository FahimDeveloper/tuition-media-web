import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import type { FormProps } from "antd";
import { type KeyboardEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@/icons";
import { useAppDispatch } from "@/hooks/useAppHooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { loggedInUser } from "@/redux/features/auth/authSlice";
import { getApiErrorMessage } from "@/utils/api-error.utils";
import { isCapsLockActive } from "@/utils/keyboard.utils";
import { normalizeEmail } from "@/utils/string.utils";
import { isRecord } from "@/utils/type-guards.utils";
import {
  AUTH_FORM_LIMITS,
  SIGN_IN_INITIAL_VALUES,
  signInEmailRules,
  signInPasswordRules,
  type SignInFormValues,
} from "@/validations/auth.validation";
import {
  authFormClasses,
  authInputClasses,
  authLinkClasses,
  authPrimaryButtonClasses,
} from "../formStyles";

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
          initialValues={SIGN_IN_INITIAL_VALUES}
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
            rules={signInEmailRules}
          >
            <Input
              size="large"
              type="email"
              placeholder="info@gmail.com"
              prefix={<MailOutlined className="text-brand-500" />}
              autoComplete="email"
              allowClear
              maxLength={AUTH_FORM_LIMITS.emailMaxLength}
              disabled={isLoading}
              className={authInputClasses}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            validateFirst
            rules={signInPasswordRules}
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
