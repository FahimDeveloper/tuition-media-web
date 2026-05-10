type DisplayUser = {
  full_name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  avatar?: string | null;
  image?: string | null;
  profileImage?: string | null;
  profile_image?: string | null;
};

const getText = (value?: string | null) => value?.trim() || "";

export const getUserDisplayName = (
  user?: DisplayUser | null,
  fallback = "Account",
) => {
  const fullName = getText(user?.full_name);
  if (fullName) return fullName;

  const splitName = [user?.first_name, user?.last_name]
    .map(getText)
    .filter(Boolean)
    .join(" ");

  return splitName || getText(user?.email) || fallback;
};

export const getUserInitials = (user?: DisplayUser | null) => {
  const displayName = getUserDisplayName(user, "");
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials.slice(0, 2) || "A";
};

export const getUserAvatar = (user?: DisplayUser | null) =>
  [
    user?.avatar,
    user?.image,
    user?.profileImage,
    user?.profile_image,
  ].find((value) => Boolean(value?.trim())) ?? null;
