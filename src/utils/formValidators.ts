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
