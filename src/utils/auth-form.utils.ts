import type { KeyboardEvent } from "react";

export const normalizeEmail = (value: unknown) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

export const isCapsLockActive = (event: KeyboardEvent<HTMLInputElement>) =>
  Boolean(event.getModifierState?.("CapsLock"));
