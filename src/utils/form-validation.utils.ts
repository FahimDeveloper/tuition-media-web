import type { Rule } from "antd/es/form";

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
