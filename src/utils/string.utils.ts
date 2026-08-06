export const normalizeWhitespace = (value: string) =>
  value.trim().replace(/\s+/g, " ");

export const normalizeEmail = (value: unknown) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

export const normalizeName = (value: unknown) =>
  typeof value === "string" ? normalizeWhitespace(value) : "";

export const normalizeNameInput = (value: unknown) =>
  typeof value === "string" ? value.replace(/\s{2,}/g, " ") : "";
