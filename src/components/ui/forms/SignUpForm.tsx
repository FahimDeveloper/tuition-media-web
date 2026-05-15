import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import type { FormInstance, FormProps } from "antd";
import type { Rule } from "antd/es/form";
import type { KeyboardEventHandler } from "react";

import {
  AUTH_FORM_LIMITS,
  SIGN_UP_COPY,
  SIGN_UP_INITIAL_VALUES,
  signUpEmailRules,
  signUpFullNameRules,
  signUpPasswordRules,
  signUpPhoneRules,
  type SignUpFormValues,
} from "@/validations/auth.validation";
import { sanitizePhoneInput } from "@/utils/phone.utils";
import { normalizeEmail, normalizeNameInput } from "@/utils/string.utils";

import {
  authFormClasses,
  authInputClasses,
  authPrimaryButtonClasses,
} from "../../../pages/AuthPages/formStyles";

type SignUpFormProps = {
  form: FormInstance<SignUpFormValues>;
  isLoading: boolean;
  isCapsLockOn: boolean;
  confirmPasswordRules: Rule[];
  onFinish: FormProps<SignUpFormValues>["onFinish"];
  onValuesChange: FormProps<SignUpFormValues>["onValuesChange"];
  onPasswordKeyEvent: KeyboardEventHandler<HTMLInputElement>;
};

export default function SignUpForm({
  form,
  isLoading,
  isCapsLockOn,
  confirmPasswordRules,
  onFinish,
  onValuesChange,
  onPasswordKeyEvent,
}: SignUpFormProps) {
  const passwordHelpText = isCapsLockOn
    ? SIGN_UP_COPY.capsLockWarning
    : SIGN_UP_COPY.passwordHint;

  return (
    <Form<SignUpFormValues>
      form={form}
      layout="vertical"
      requiredMark={false}
      initialValues={SIGN_UP_INITIAL_VALUES}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
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
          extra="Use a Bangladeshi phone number"
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
          extra={passwordHelpText}
        >
          <Input.Password
            size="large"
            placeholder="Create a password"
            prefix={<LockOutlined className="text-brand-500" />}
            autoComplete="new-password"
            maxLength={AUTH_FORM_LIMITS.passwordMaxLength}
            disabled={isLoading}
            className={authInputClasses}
            onKeyUp={onPasswordKeyEvent}
            onKeyDown={onPasswordKeyEvent}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          validateFirst
          rules={confirmPasswordRules}
          extra={passwordHelpText}
        >
          <Input.Password
            size="large"
            placeholder="Re-enter your password"
            prefix={<LockOutlined className="text-brand-500" />}
            autoComplete="new-password"
            maxLength={AUTH_FORM_LIMITS.passwordMaxLength}
            disabled={isLoading}
            className={authInputClasses}
            onKeyUp={onPasswordKeyEvent}
            onKeyDown={onPasswordKeyEvent}
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
  );
}
