const BANGLADESHI_MOBILE_PATTERN = /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/;

export const sanitizePhoneInput = (value: unknown) =>
  typeof value === "string" ? value.replace(/[^\d+\s()-]/g, "") : "";

export const stripPhoneFormatting = (value = "") =>
  value.replace(/[()\s-]/g, "").trim();

export const normalizeBangladeshiPhoneNumber = (value = "") => {
  const cleaned = stripPhoneFormatting(value);
  return cleaned.startsWith("01") ? `+88${cleaned}` : cleaned;
};

export const isValidBangladeshiPhoneNumber = (value = "") =>
  BANGLADESHI_MOBILE_PATTERN.test(stripPhoneFormatting(value));
