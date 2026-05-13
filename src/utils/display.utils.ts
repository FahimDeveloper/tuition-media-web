import type { UploadFile } from "antd/es/upload/interface";
import { isRecord, isStringArray } from "./type-guards.utils";

type SalaryRange = {
  min?: number;
  max?: number;
};

const isSalaryRange = (value: unknown): value is SalaryRange =>
  isRecord(value) &&
  (value.min === undefined || typeof value.min === "number") &&
  (value.max === undefined || typeof value.max === "number");

export const getDisplayValue = (value?: unknown) => {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return String(value);
  if (Array.isArray(value))
    return value.length ? value.join(", ") : "Not provided";
  if (typeof value !== "string") return value ? String(value) : "Not provided";
  return value?.trim() || "Not provided";
};

export const getArrayDisplayValue = (value?: string[]) => getDisplayValue(value);

export const getUploadDisplayValue = (value?: UploadFile[] | string) => {
  if (typeof value === "string") return getDisplayValue(value);
  return value?.length
    ? value.map((file) => file.name).join(", ")
    : "Not provided";
};

export const getTakaDisplayValue = (value?: number) => {
  return value ? `৳${value}` : "Any";
};

export const getSalaryDisplayValue = (salaryRange?: unknown) => {
  if (!isSalaryRange(salaryRange)) return "Not provided";
  if (!salaryRange?.min && !salaryRange?.max) return "Not provided";

  return `${getTakaDisplayValue(salaryRange.min)} - ${getTakaDisplayValue(
    salaryRange.max,
  )}`;
};

export const formatStringList = (value: unknown) =>
  isStringArray(value) ? getArrayDisplayValue(value) : getDisplayValue(value);
