export { isRecord } from "./type-guards.utils";
import { isRecord } from "./type-guards.utils";

export const getApiErrorPayload = (error: unknown) => {
  if (!isRecord(error) || !("data" in error) || !isRecord(error.data)) {
    return null;
  }

  return error.data;
};

export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage = "Something went wrong. Please try again.",
) => {
  const payload = getApiErrorPayload(error);

  if (typeof payload?.message === "string" && payload.message.trim()) {
    return payload.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (isRecord(error) && typeof error.message === "string" && error.message) {
    return error.message;
  }

  return fallbackMessage;
};
