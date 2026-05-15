import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import type { FormInstance, FormProps } from "antd";
import type { KeyboardEventHandler } from "react";

import {
  AUTH_FORM_LIMITS,
  SIGN_IN_INITIAL_VALUES,
  signInEmailRules,
  signInPasswordRules,
  type SignInFormValues,
} from "@/validations/auth.validation";
import { normalizeEmail } from "@/utils/string.utils";

import {
  authFormClasses,
  authInputClasses,
  authPrimaryButtonClasses,
} from "../../../pages/AuthPages/formStyles";

type SignInFormProps = {
  form: FormInstance<SignInFormValues>;
  isLoading: boolean;
  isCapsLockOn: boolean;
  onFinish: FormProps<SignInFormValues>["onFinish"];
  onValuesChange: FormProps<SignInFormValues>["onValuesChange"];
  onPasswordKeyEvent: KeyboardEventHandler<HTMLInputElement>;
};

export default function SignInForm({
  form,
  isLoading,
  isCapsLockOn,
  onFinish,
  onValuesChange,
  onPasswordKeyEvent,
}: SignInFormProps) {
  return (
    <Form<SignInFormValues>
      form={form}
      layout="vertical"
      requiredMark={false}
      initialValues={SIGN_IN_INITIAL_VALUES}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
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
          onKeyUp={onPasswordKeyEvent}
          onKeyDown={onPasswordKeyEvent}
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
  );
}
