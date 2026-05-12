import type { UploadFile } from "antd/es/upload/interface";

export const getDisplayValue = (value?: unknown) => {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return String(value);
  if (Array.isArray(value))
    return value.length ? value.join(", ") : "Not provided";
  if (typeof value !== "string") return value ? String(value) : "Not provided";
  return value?.trim() || "Not provided";
};

export const getArrayDisplayValue = (value?: string[]) => {
  return value?.length ? value.join(", ") : "Not provided";
};

export const getUploadDisplayValue = (value?: UploadFile[] | string) => {
  if (typeof value === "string") return getDisplayValue(value);
  return value?.length
    ? value.map((file) => file.name).join(", ")
    : "Not provided";
};

export const getTakaDisplayValue = (value?: number) => {
  return value ? `à§³${value}` : "Any";
};

export const getSalaryDisplayValue = (salaryRange?: {
  min?: number;
  max?: number;
}) => {
  if (!salaryRange?.min && !salaryRange?.max) return "Not provided";

  return `${getTakaDisplayValue(salaryRange.min)} - ${getTakaDisplayValue(
    salaryRange.max,
  )}`;
};
