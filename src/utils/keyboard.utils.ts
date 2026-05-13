import type { KeyboardEvent } from "react";

export const isCapsLockActive = (event: KeyboardEvent<HTMLInputElement>) =>
  Boolean(event.getModifierState?.("CapsLock"));
