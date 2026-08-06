import { getApiErrorMessage } from "@/utils/api-error.utils";
import { isRecord } from "@/utils/type-guards.utils";

const FALLBACK_REDIRECT_PATH = "/tutor";

export const getLoginErrorMessage = (error: unknown) => {
  if (isRecord(error) && error.status === 401) {
    return "Incorrect email or password.";
  }

  return getApiErrorMessage(error);
};

export const getSafeRedirectPath = (state: unknown) => {
  if (!isRecord(state) || typeof state.from !== "string") {
    return FALLBACK_REDIRECT_PATH;
  }

  const redirectPath = state.from.trim();

  if (
    !redirectPath.startsWith("/") ||
    redirectPath.startsWith("//") ||
    redirectPath.includes("://")
  ) {
    return FALLBACK_REDIRECT_PATH;
  }

  return redirectPath;
};
