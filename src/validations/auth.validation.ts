import type { Rule } from "antd/es/form";
import {
  bangladeshiPhoneRule,
  emailRules,
  fullNameRules,
  passwordRules,
} from "@/validations/form.validation";

export type SignInFormValues = {
  email: string;
  password: string;
};

export type SignUpFormValues = {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export const AUTH_FORM_LIMITS = {
  fullNameMinLength: 2,
  fullNameMaxLength: 80,
  emailMaxLength: 100,
  loginPasswordMinLength: 6,
  signupPasswordMinLength: 8,
  passwordMaxLength: 128,
} as const;

export const SIGN_IN_INITIAL_VALUES: SignInFormValues = {
  email: "",
  password: "",
};

export const SIGN_UP_INITIAL_VALUES: SignUpFormValues = {
  full_name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export const SIGN_UP_COPY = {
  title: "Sign Up",
  description: "Enter your information to create your teacher account.",
  passwordHint: "",
  capsLockWarning: "Caps Lock is on.",
  submit: "Sign Up",
  submitting: "Creating account...",
  genericError: "Something went wrong. Please try again.",
} as const;

export const SIGN_UP_MESSAGES = {
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

export const signInEmailRules: Rule[] = emailRules({
  requiredMessage: "Please enter your email.",
  invalidMessage: "Please enter a valid email address.",
  tooLongMessage: "Email is too long.",
  spacesMessage: "Email cannot contain spaces.",
  maxLength: AUTH_FORM_LIMITS.emailMaxLength,
});

export const signInPasswordRules: Rule[] = passwordRules({
  requiredMessage: "Please enter your password.",
  tooShortMessage: "Password must be at least 6 characters.",
  tooLongMessage: "Password is too long.",
  minLength: AUTH_FORM_LIMITS.loginPasswordMinLength,
  maxLength: AUTH_FORM_LIMITS.passwordMaxLength,
  spacesOnlyMessage: "Password cannot be only spaces.",
});

export const signUpFullNameRules: Rule[] = fullNameRules({
  requiredMessage: SIGN_UP_MESSAGES.fullNameRequired,
  tooShortMessage: SIGN_UP_MESSAGES.fullNameTooShort,
  tooLongMessage: SIGN_UP_MESSAGES.fullNameTooLong,
  invalidMessage: SIGN_UP_MESSAGES.fullNameInvalid,
  minLength: AUTH_FORM_LIMITS.fullNameMinLength,
  maxLength: AUTH_FORM_LIMITS.fullNameMaxLength,
});

export const signUpEmailRules: Rule[] = emailRules({
  requiredMessage: SIGN_UP_MESSAGES.emailRequired,
  invalidMessage: SIGN_UP_MESSAGES.emailInvalid,
  tooLongMessage: SIGN_UP_MESSAGES.emailTooLong,
  spacesMessage: SIGN_UP_MESSAGES.emailSpaces,
  maxLength: AUTH_FORM_LIMITS.emailMaxLength,
});

export const signUpPhoneRules: Rule[] = [
  { required: true, message: SIGN_UP_MESSAGES.phoneRequired },
  bangladeshiPhoneRule(SIGN_UP_MESSAGES.phoneInvalid),
];

export const signUpPasswordRules: Rule[] = passwordRules({
  requiredMessage: SIGN_UP_MESSAGES.passwordRequired,
  tooShortMessage: SIGN_UP_MESSAGES.passwordTooShort,
  tooLongMessage: SIGN_UP_MESSAGES.passwordTooLong,
  minLength: AUTH_FORM_LIMITS.signupPasswordMinLength,
  maxLength: AUTH_FORM_LIMITS.passwordMaxLength,
  requireLetterAndNumber: true,
  letterAndNumberMessage: SIGN_UP_MESSAGES.passwordNeedsLetterAndNumber,
});
