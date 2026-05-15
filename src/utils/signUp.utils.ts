import type { FormInstance } from "antd";

import type { RegistrationPayload } from "@/types";
import { getApiErrorPayload } from "@/utils/api-error.utils";
import { normalizeBangladeshiPhoneNumber } from "@/utils/phone.utils";
import { normalizeEmail, normalizeName } from "@/utils/string.utils";
import { isRecord } from "@/utils/type-guards.utils";
import type { SignUpFormValues } from "@/validations/auth.validation";

type SignUpFieldError = {
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

export const getSignUpFieldErrors = (error: unknown): SignUpFieldError[] => {
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

export const clearSignUpFieldErrors = (
  form: FormInstance<SignUpFormValues>,
  fieldNames: Array<keyof SignUpFormValues>,
) => {
  if (fieldNames.length === 0) {
    return;
  }

  form.setFields(fieldNames.map((name) => ({ name, errors: [] })));
};

export const buildRegistrationPayload = (
  values: SignUpFormValues,
): RegistrationPayload => {
  return {
    full_name: normalizeName(values.full_name),
    email: normalizeEmail(values.email),
    phone: normalizeBangladeshiPhoneNumber(values.phone),
    password: values.password,
  } as RegistrationPayload;
};
