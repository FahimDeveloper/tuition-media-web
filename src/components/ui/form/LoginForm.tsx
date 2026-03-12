import {type KeyboardEvent, useState} from 'react';
import {
  GoogleOutlined,
  LockOutlined,
  MailOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import {Alert, Button, Checkbox, Form, Input} from 'antd';
import type {FormProps} from 'antd';
import {Link} from 'react-router-dom';

type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

type DemoLoginResponse = {
  success: true;
  user: {
    id: number;
    email: string;
    name: string;
  };
  remember: boolean;
};

type LoginError = Error & {
  status?: number;
};

type LoginErrorAlertProps = {
  message: string;
};

const DEMO_CREDENTIALS = {
  email: 'demo@example.com',
  password: 'Demo@123',
} as const;

const DEMO_REQUEST_DELAY_MS = 1200;
const EMAIL_MAX_LENGTH = 100;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 128;

const DEFAULT_FORM_VALUES: LoginFormValues = {
  email: '',
  password: '',
  remember: true,
};

const LOGIN_TEXT = {
  brandPrimary: 'Tuition',
  brandAccent: 'Media',
  loginLabel: 'Tutor login',
  eyebrow: 'Welcome back',
  title: 'Sign in to Tuition Media',
  googleButton: 'Continue with Google',
  emailSignInDivider: 'Or sign in with email',
  emailLabel: 'Email address',
  emailPlaceholder: 'you@example.com',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Enter your password',
  rememberMe: 'Remember me',
  forgotPassword: 'Forgot password?',
  submit: 'Sign in',
  submitting: 'Signing in...',
  capsLockWarning: 'Caps Lock is on.',
  imagePlaceholder: 'Image Placeholder',
  termsIntro: "By continuing, you agree to Tuition Media's",
  termsOfService: 'Terms of Service',
  privacyPolicy: 'Privacy Policy',
  signupPrompt: 'New here?',
  signupCta: 'Create your tutor account',
} as const;

const VALIDATION_TEXT = {
  emailRequired: 'Please enter your email.',
  emailInvalid: 'Please enter a valid email address.',
  emailSpaces: 'Email cannot contain spaces.',
  emailTooLong: 'Email is too long.',
  passwordRequired: 'Please enter your password.',
  passwordInvalidText: 'Password must be valid text.',
  passwordSpacesOnly: 'Password cannot be only spaces.',
  passwordTooShort: 'Password must be at least 6 characters.',
  passwordTooLong: 'Password is too long.',
  invalidCredentials: 'Incorrect email or password.',
  genericError: 'Something went wrong. Please try again.',
} as const;

const sectionClasses =
  'relative overflow-hidden bg-[linear-gradient(180deg,rgba(242,247,252,0.98)_0%,rgba(249,247,247,1)_100%)] px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8';

const backgroundGlowClasses =
  'pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,rgba(102,153,207,0.18),transparent_42%),radial-gradient(circle_at_top_right,rgba(63,114,175,0.12),transparent_32%)]';

const cardShellClasses =
  'overflow-hidden rounded-[30px] border border-brand-100/80 bg-surface shadow-[0_24px_60px_rgba(17,45,78,0.12)]';

const formColumnClasses = 'lg:w-1/2 xl:w-5/12';
const formColumnInnerClasses = 'px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-14';

const brandBadgeClasses =
  'mx-auto inline-flex items-center gap-3 rounded-full border border-brand-200/70 bg-brand-50/80 px-4 py-2 text-sm font-semibold text-brand-700 transition-all duration-200 hover:border-brand-300 hover:bg-brand-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 lg:mx-0';

const introClasses = 'mt-8 text-center lg:text-left';

const formWrapperClasses =
  'mt-8 mx-auto w-full max-w-sm text-center sm:max-w-md lg:mx-0 lg:max-w-sm lg:text-left';

const dividerClasses = 'my-8 flex items-center gap-4';
const dividerLineClasses = 'h-px flex-1 bg-brand-200/80';
const dividerLabelClasses =
  'font-poppins text-[11px] font-semibold uppercase tracking-[0.18em] text-text-strong/55';

const errorAlertClasses =
  'mb-5! rounded-xl! border! border-red-200! bg-red-50/90! [&_.ant-alert-content]:text-center lg:[&_.ant-alert-content]:text-left';

const legalTextClasses =
  'mt-6 text-center text-sm leading-6 text-text-strong/70 lg:text-left';

const signupTextClasses =
  'mt-5 text-center text-sm text-text-strong/70 lg:text-left';

const formClasses =
  '[&_.ant-form-item]:mb-5 [&_.ant-form-item-explain-error]:!mt-2 [&_.ant-form-item-explain-error]:!text-xs [&_.ant-form-item-explain-error]:!font-medium [&_.ant-form-item-extra]:!mt-2 [&_.ant-form-item-extra]:!text-center lg:[&_.ant-form-item-extra]:!text-left [&_.ant-form-item-label>label]:!mx-auto [&_.ant-form-item-label>label]:!pb-2 [&_.ant-form-item-label>label]:!text-center [&_.ant-form-item-label>label]:!font-semibold [&_.ant-form-item-label>label]:!text-text-strong lg:[&_.ant-form-item-label>label]:!mx-0 lg:[&_.ant-form-item-label>label]:!text-left [&_.ant-checkbox-wrapper]:!text-sm [&_.ant-checkbox-wrapper]:!font-medium [&_.ant-checkbox-wrapper]:!text-text-strong';

const inputClasses =
  '!h-12 !rounded-xl !border-brand-200/80 !bg-brand-50/70 !px-3 !text-text-strong !shadow-none transition-all duration-200 hover:!border-brand-400 focus-within:!border-brand-500 focus-within:!bg-white focus-within:!shadow-[0_0_0_4px_rgba(63,114,175,0.12)]';

const secondaryButtonClasses =
  '!h-12 !rounded-xl !border !border-brand-200 !bg-brand-50/80 !font-semibold !text-text-strong !shadow-none transition-all duration-200 hover:!border-brand-400 hover:!bg-white hover:!text-brand-700 focus-visible:!outline-none focus-visible:!ring-4 focus-visible:!ring-brand-200/80';

const primaryButtonClasses =
  '!h-12 !rounded-xl !border-0 !bg-brand-600 !font-semibold !text-text-on-brand !shadow-lg !shadow-brand-600/20 transition-all duration-200 hover:!bg-brand-700 focus-visible:!outline-none focus-visible:!ring-4 focus-visible:!ring-brand-200/80';

const linkClasses =
  'font-semibold text-brand-700 underline-offset-4 transition-colors duration-200 hover:text-brand-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70';

const actionLinkClasses = `${linkClasses} inline-flex min-h-11 items-center justify-center rounded-lg px-3`;

const createLoginError = (message: string, status?: number): LoginError => {
  const error = new Error(message) as LoginError;
  error.status = status;
  return error;
};

// Local demo request until the real auth API is wired.
async function loginRequest({
  email,
  password,
  remember,
}: LoginFormValues): Promise<DemoLoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, DEMO_REQUEST_DELAY_MS));

  if (
    email !== DEMO_CREDENTIALS.email ||
    password !== DEMO_CREDENTIALS.password
  ) {
    throw createLoginError(VALIDATION_TEXT.invalidCredentials, 401);
  }

  return {
    success: true,
    user: {
      id: 1,
      email: DEMO_CREDENTIALS.email,
      name: 'Demo User',
    },
    remember,
  };
}

const normalizeEmail = (value: unknown) => {
  if (typeof value !== 'string') return '';
  return value.trim().toLowerCase();
};

const buildLoginPayload = (values: LoginFormValues): LoginFormValues => ({
  email: normalizeEmail(values.email),
  password: values.password,
  remember: Boolean(values.remember),
});

const validateEmail = async (_: unknown, value?: string) => {
  if (!value) return;

  if (value.includes(' ')) {
    throw new Error(VALIDATION_TEXT.emailSpaces);
  }

  if (value.length > EMAIL_MAX_LENGTH) {
    throw new Error(VALIDATION_TEXT.emailTooLong);
  }
};

const validatePassword = async (_: unknown, value?: string) => {
  if (!value) return;

  if (typeof value !== 'string') {
    throw new Error(VALIDATION_TEXT.passwordInvalidText);
  }

  if (value.trim().length === 0) {
    throw new Error(VALIDATION_TEXT.passwordSpacesOnly);
  }

  if (value.length < PASSWORD_MIN_LENGTH) {
    throw new Error(VALIDATION_TEXT.passwordTooShort);
  }

  if (value.length > PASSWORD_MAX_LENGTH) {
    throw new Error(VALIDATION_TEXT.passwordTooLong);
  }
};

const isUnauthorizedLoginError = (error: unknown) => {
  if (typeof error !== 'object' || error === null || !('status' in error)) {
    return false;
  }

  return error.status === 401;
};

const getLoginErrorMessage = (error: unknown) => {
  if (isUnauthorizedLoginError(error)) {
    return VALIDATION_TEXT.invalidCredentials;
  }

  return VALIDATION_TEXT.genericError;
};

const getCapsLockState = (event: KeyboardEvent<HTMLInputElement>) =>
  Boolean(event.getModifierState?.('CapsLock'));

const emailRules = [
  {
    required: true,
    message: VALIDATION_TEXT.emailRequired,
  },
  {
    type: 'email' as const,
    message: VALIDATION_TEXT.emailInvalid,
  },
  {
    validator: validateEmail,
  },
];

const passwordRules = [
  {
    required: true,
    message: VALIDATION_TEXT.passwordRequired,
  },
  {
    validator: validatePassword,
  },
];

const LoginBrandBadge = () => {
  return (
    <Link to="/" className={brandBadgeClasses}>
      <span className="font-poppins text-base font-extrabold tracking-tight text-text-strong">
        {LOGIN_TEXT.brandPrimary}{' '}
        <span className="text-brand-600">{LOGIN_TEXT.brandAccent}</span>
      </span>
      <span className="h-2 w-2 rounded-full bg-brand-500" />
      <span className="text-[11px] uppercase tracking-[0.18em] text-brand-700/80">
        {LOGIN_TEXT.loginLabel}
      </span>
    </Link>
  );
};

const LoginIntro = () => {
  return (
    <div className={introClasses}>
      <span className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
        {LOGIN_TEXT.eyebrow}
      </span>
      <h1 className="mt-3 font-poppins text-3xl font-extrabold leading-tight text-text-strong sm:text-4xl">
        {LOGIN_TEXT.title}
      </h1>
    </div>
  );
};

const AuthenticationDivider = () => {
  return (
    <div className={dividerClasses}>
      <div className={dividerLineClasses} />
      <span className={dividerLabelClasses}>
        {LOGIN_TEXT.emailSignInDivider}
      </span>
      <div className={dividerLineClasses} />
    </div>
  );
};

const LoginErrorAlert = ({message}: LoginErrorAlertProps) => {
  if (!message) {
    return null;
  }

  return (
    <Alert
      type="error"
      showIcon
      title={message}
      className={errorAlertClasses}
    />
  );
};

const LoginFooterLinks = () => {
  return (
    <>
      <p className={legalTextClasses}>
        {LOGIN_TEXT.termsIntro}{' '}
        <a href="#" className={linkClasses}>
          {LOGIN_TEXT.termsOfService}
        </a>{' '}
        and{' '}
        <a href="#" className={linkClasses}>
          {LOGIN_TEXT.privacyPolicy}
        </a>
        .
      </p>

      <p className={signupTextClasses}>
        {LOGIN_TEXT.signupPrompt}{' '}
        <Link to="/signup" className={linkClasses}>
          {LOGIN_TEXT.signupCta}
        </Link>
      </p>
    </>
  );
};

const ImagePlaceholderPanel = () => {
  return (
    <div className="relative hidden flex-1 overflow-hidden bg-[linear-gradient(160deg,#1F3755_0%,#355F92_48%,#3F72AF_100%)] lg:flex">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,247,247,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(143,182,222,0.18),transparent_38%)]" />

      <div className="relative flex w-full items-center justify-center px-10 py-12 xl:px-14 xl:py-14">
        <div className="flex w-full max-w-105 items-center justify-center rounded-[28px] border border-white/12 bg-white/10 p-6 backdrop-blur-sm">
          <div className="flex aspect-4/5 w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/25 bg-[linear-gradient(180deg,rgba(249,247,247,0.12)_0%,rgba(143,182,222,0.08)_100%)] px-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-brand-50">
              <PictureOutlined />
            </span>
            <p className="mt-5 font-poppins text-sm font-semibold uppercase tracking-[0.18em] text-brand-100/85">
              {LOGIN_TEXT.imagePlaceholder}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LoginForm() {
  const [form] = Form.useForm<LoginFormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState('');
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const isFormDisabled = isSubmitting;
  const passwordFieldExtra = isCapsLockOn ? (
    <span className="text-xs font-medium text-amber-700">
      {LOGIN_TEXT.capsLockWarning}
    </span>
  ) : null;

  const handlePasswordKeyEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    setIsCapsLockOn(getCapsLockState(event));
  };

  const handleValuesChange: FormProps<LoginFormValues>['onValuesChange'] =
    () => {
      if (authErrorMessage) {
        setAuthErrorMessage('');
      }
    };

  const handleGoogleSignIn = () => {
    // Placeholder until Google auth is wired.
    return undefined;
  };

  const handleSubmit: FormProps<LoginFormValues>['onFinish'] = async (
    values,
  ) => {
    const payload = buildLoginPayload(values);

    setAuthErrorMessage('');
    setIsSubmitting(true);

    try {
      await loginRequest(payload);
      form.resetFields(['password']);
    } catch (error) {
      setAuthErrorMessage(getLoginErrorMessage(error));
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
            <div className={formColumnClasses}>
              <div className={formColumnInnerClasses}>
                <LoginBrandBadge />
                <LoginIntro />

                <div className={formWrapperClasses}>
                  <Button
                    size="large"
                    block
                    disabled={isFormDisabled}
                    icon={<GoogleOutlined />}
                    className={secondaryButtonClasses}
                    onClick={handleGoogleSignIn}
                  >
                    {LOGIN_TEXT.googleButton}
                  </Button>

                  <AuthenticationDivider />

                  <LoginErrorAlert message={authErrorMessage} />

                  <Form<LoginFormValues>
                    form={form}
                    layout="vertical"
                    requiredMark={false}
                    initialValues={DEFAULT_FORM_VALUES}
                    onFinish={handleSubmit}
                    onValuesChange={handleValuesChange}
                    autoComplete="on"
                    className={formClasses}
                  >
                    <Form.Item
                      label={LOGIN_TEXT.emailLabel}
                      name="email"
                      normalize={normalizeEmail}
                      rules={emailRules}
                    >
                      <Input
                        size="large"
                        type="email"
                        placeholder={LOGIN_TEXT.emailPlaceholder}
                        prefix={<MailOutlined className="text-brand-500" />}
                        autoComplete="email"
                        allowClear
                        maxLength={EMAIL_MAX_LENGTH}
                        disabled={isFormDisabled}
                        className={inputClasses}
                      />
                    </Form.Item>

                    <Form.Item
                      label={LOGIN_TEXT.passwordLabel}
                      name="password"
                      validateFirst
                      rules={passwordRules}
                      extra={passwordFieldExtra}
                    >
                      <Input.Password
                        size="large"
                        placeholder={LOGIN_TEXT.passwordPlaceholder}
                        prefix={<LockOutlined className="text-brand-500" />}
                        autoComplete="current-password"
                        disabled={isFormDisabled}
                        className={inputClasses}
                        onKeyUp={handlePasswordKeyEvent}
                        onKeyDown={handlePasswordKeyEvent}
                      />
                    </Form.Item>

                    <div className="mb-6 flex items-center justify-between">
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        className="mb-0!"
                      >
                        <Checkbox disabled={isFormDisabled}>
                          {LOGIN_TEXT.rememberMe}
                        </Checkbox>
                      </Form.Item>

                      <a href="/forgot-password" className={actionLinkClasses}>
                        {LOGIN_TEXT.forgotPassword}
                      </a>
                    </div>

                    <Form.Item className="mb-0!">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}
                        disabled={isFormDisabled}
                        block
                        className={primaryButtonClasses}
                      >
                        {isSubmitting
                          ? LOGIN_TEXT.submitting
                          : LOGIN_TEXT.submit}
                      </Button>
                    </Form.Item>
                  </Form>

                  <LoginFooterLinks />
                </div>
              </div>
            </div>

            <ImagePlaceholderPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
