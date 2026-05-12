export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const getApiErrorPayload = <TPayload>(
  error: unknown,
): TPayload | null => {
  if (!isRecord(error) || !("data" in error) || !isRecord(error.data)) {
    return null;
  }

  return error.data as TPayload;
};

export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage = "Something went wrong. Please try again.",
) => {
  const payload = getApiErrorPayload<{ message?: unknown }>(error);

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
