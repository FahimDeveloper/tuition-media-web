import type { Rule } from "antd/es/form";
import { isValidBangladeshiPhoneNumber } from "@/utils/phone.utils";

const NAME_PATTERN = /^(?=.*\p{L})[\p{L} .'-]+$/u;
const EMAIL_NO_SPACES_PATTERN = /^\S+$/;
const PASSWORD_WITH_LETTER_AND_NUMBER_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).+$/;
const ID_NUMBER_PATTERN = /^[A-Za-z0-9-]{6,32}$/;

export const requiredRule = (message: string): Rule[] => [
  { required: true, message },
];

export const arrayRequiredRule = (message: string): Rule[] => [
  {
    required: true,
    type: "array",
    min: 1,
    message,
  },
];

export const emailRules = ({
  requiredMessage,
  invalidMessage,
  spacesMessage,
  tooLongMessage,
  maxLength,
}: {
  requiredMessage: string;
  invalidMessage: string;
  spacesMessage: string;
  tooLongMessage: string;
  maxLength: number;
}): Rule[] => [
  { required: true, message: requiredMessage },
  { type: "email", message: invalidMessage },
  { max: maxLength, message: tooLongMessage },
  { pattern: EMAIL_NO_SPACES_PATTERN, message: spacesMessage },
];

export const passwordRules = ({
  requiredMessage,
  tooShortMessage,
  tooLongMessage,
  minLength,
  maxLength,
  requireLetterAndNumber = false,
  letterAndNumberMessage,
  spacesOnlyMessage,
}: {
  requiredMessage: string;
  tooShortMessage: string;
  tooLongMessage: string;
  minLength: number;
  maxLength: number;
  requireLetterAndNumber?: boolean;
  letterAndNumberMessage?: string;
  spacesOnlyMessage?: string;
}): Rule[] => {
  const rules: Rule[] = [
    { required: true, message: requiredMessage },
    { min: minLength, message: tooShortMessage },
    { max: maxLength, message: tooLongMessage },
  ];

  if (spacesOnlyMessage) {
    rules.push({
      validator: async (_: unknown, value?: string) => {
        if (!value || value.trim()) {
          return;
        }

        throw new Error(spacesOnlyMessage);
      },
    });
  }

  if (requireLetterAndNumber) {
    rules.push({
      pattern: PASSWORD_WITH_LETTER_AND_NUMBER_PATTERN,
      message: letterAndNumberMessage,
    });
  }

  return rules;
};

export const fullNameRules = ({
  requiredMessage,
  tooShortMessage,
  tooLongMessage,
  invalidMessage,
  minLength,
  maxLength,
}: {
  requiredMessage: string;
  tooShortMessage: string;
  tooLongMessage: string;
  invalidMessage: string;
  minLength: number;
  maxLength: number;
}): Rule[] => [
  { required: true, message: requiredMessage },
  { min: minLength, message: tooShortMessage },
  { max: maxLength, message: tooLongMessage },
  { pattern: NAME_PATTERN, message: invalidMessage },
];

export const bangladeshiPhoneRule = (message: string): Rule => ({
  validator: async (_: unknown, value?: string) => {
    if (!value || isValidBangladeshiPhoneNumber(value)) {
      return;
    }

    throw new Error(message);
  },
});

export const validateFullName = (_: unknown, value?: string) => {
  if (!value || !value.trim()) {
    return Promise.reject(new Error("Full name is required"));
  }

  const trimmed = value.trim();

  if (trimmed.length > 100) {
    return Promise.reject(new Error("Full name cannot exceed 100 characters"));
  }

  return Promise.resolve();
};

export const optionalUrlRules: Rule[] = [
  {
    type: "url",
    message: "Enter a valid URL",
  },
];

export const idNumberRules: Rule[] = [
  {
    pattern: ID_NUMBER_PATTERN,
    message: "Enter a valid identification number",
  },
];
