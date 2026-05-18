import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import {
  loggedOutUser,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import {
  FiChevronDown,
  FiGrid,
  FiLogOut,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

type ProfileAction = {
  label: string;
  href: string;
  description: string;
  icon: ReactNode;
};

const profileActions: ProfileAction[] = [
  {
    label: "Dashboard",
    href: "/tutor",
    description: "Track your activity overview",
    icon: <FiGrid size={18} />,
  },
  {
    label: "My Profile",
    href: "/tutor/profile",
    description: "Update your personal info",
    icon: <FiUser size={18} />,
  },
  {
    label: "Settings",
    href: "/tutor/settings",
    description: "Manage preferences and alerts",
    icon: <FiSettings size={18} />,
  },
];

const getUserDisplayName = (
  firstName?: string | null,
  lastName?: string | null,
  fallbackEmail?: string | null,
) => {
  const fullName = [firstName, lastName]
    .filter((value): value is string => Boolean(value?.trim()))
    .join(" ")
    .trim();

  if (fullName) {
    return fullName;
  }

  return fallbackEmail?.trim() || "Account";
};

const getUserInitials = (
  firstName?: string | null,
  lastName?: string | null,
) => {
  const initials = [firstName, lastName]
    .filter((value): value is string => Boolean(value?.trim()))
    .map((value) => value.trim().charAt(0).toUpperCase())
    .join("");

  if (initials) {
    return initials.slice(0, 2);
  }

  return "A";
};

const getAvatarSource = (
  avatar?: string | null,
  image?: string | null,
  profileImage?: string | null,
  legacyProfileImage?: string | null,
) =>
  [avatar, image, profileImage, legacyProfileImage].find(
    (value) => typeof value === "string" && value.trim().length > 0,
  ) ?? null;

type ProfileAvatarProps = {
  avatarSrc: string | null;
  alt: string;
  initials: string;
  sizeClassName: string;
  ringClassName: string;
  textClassName: string;
};

const ProfileAvatar = ({
  avatarSrc,
  alt,
  initials,
  sizeClassName,
  ringClassName,
  textClassName,
}: ProfileAvatarProps) => {
  const [failedAvatarSrc, setFailedAvatarSrc] = useState<string | null>(null);
  const shouldRenderImage = Boolean(avatarSrc && avatarSrc !== failedAvatarSrc);

  if (shouldRenderImage && avatarSrc) {
    return (
      <img
        src={avatarSrc}
        alt={alt}
        className={`${sizeClassName} rounded-full object-cover ${ringClassName}`}
        onError={() => setFailedAvatarSrc(avatarSrc)}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${sizeClassName} bg-brand-100 font-poppins text-brand-700 inline-flex items-center justify-center rounded-full font-bold ${ringClassName} ${textClassName}`}
    >
      {initials}
    </span>
  );
};

const ProfileDropdown = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const firstActionRef = useRef<HTMLAnchorElement | null>(null);
  const menuId = useId();

  const displayName = getUserDisplayName(
    currentUser?.first_name,
    currentUser?.last_name,
    currentUser?.email,
  );
  const triggerLabel = currentUser?.first_name?.trim() || displayName;
  const profileBadge =
    currentUser?.role?.trim() ||
    (currentUser?.isProfileCompleted
      ? "Profile complete"
      : "Profile incomplete");
  const avatarAlt = `${displayName} profile`;
  const userInitials = getUserInitials(
    currentUser?.first_name,
    currentUser?.last_name,
  );
  const avatarSrc = getAvatarSource(
    currentUser?.avatar,
    currentUser?.image,
    currentUser?.profileImage,
    currentUser?.profile_image,
  );

  const closeMenu = (shouldFocusTrigger = false) => {
    setIsOpen(false);

    if (shouldFocusTrigger) {
      requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }
  };

  const toggleMenu = () => {
    setIsOpen((previousState) => !previousState);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerOutside = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current) {
        return;
      }

      if (!containerRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu(true);
      }
    };

    document.addEventListener("mousedown", handlePointerOutside);
    document.addEventListener("touchstart", handlePointerOutside, {
      passive: true,
    });
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerOutside);
      document.removeEventListener("touchstart", handlePointerOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    requestAnimationFrame(() => {
      firstActionRef.current?.focus();
    });
  }, [isOpen]);

  const handleLogout = () => {
    closeMenu(true);
    dispatch(loggedOutUser());
    Swal.fire({
      title: "Success",
      text: "You have successfully logged out.",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      iconColor: "var(--color-brand-700)",
    });
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleMenu}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? "Close account menu" : "Open account menu"}
        className={`bg-surface-elevated focus-visible:ring-brand-400/70 inline-flex min-h-11 items-center rounded-full border transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none ${
          isOpen
            ? "border-brand-400 text-brand-700 dark:text-brand-300"
            : "border-border text-neutral hover:border-brand-500 hover:text-brand-700 dark:hover:border-brand-400 dark:hover:text-brand-200"
        } px-1.5 md:gap-2 md:rounded-full md:px-2.5`}
      >
        <ProfileAvatar
          avatarSrc={avatarSrc}
          alt={avatarAlt}
          initials={userInitials}
          sizeClassName="h-8 w-8"
          ringClassName="ring-1 ring-brand-200"
          textClassName="text-xs"
        />

        <span className="hidden max-w-32 truncate text-sm font-semibold md:block">
          {triggerLabel}
        </span>
        <FiChevronDown
          size={16}
          className={`hidden transition-transform duration-200 md:block ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Account menu"
          className="border-border bg-surface-elevated shadow-theme-lg absolute right-0 z-1000 mt-2 w-[min(20rem,calc(100vw-1.5rem))] rounded-2xl border"
        >
          <div className="border-border flex items-center gap-3 border-b px-4 py-4">
            <ProfileAvatar
              avatarSrc={avatarSrc}
              alt={avatarAlt}
              initials={userInitials}
              sizeClassName="h-12 w-12"
              ringClassName="ring-2 ring-brand-200"
              textClassName="text-sm"
            />
            <div className="min-w-0">
              <p className="text-neutral truncate text-sm font-bold">
                {displayName}
              </p>
              <p className="bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 mt-0.5 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold">
                {profileBadge}
              </p>
              {currentUser?.email ? (
                <p className="text-text-muted mt-1 truncate text-xs">
                  {currentUser.email}
                </p>
              ) : null}
              {currentUser?.phone ? (
                <p className="text-text-muted truncate text-xs">
                  {currentUser.phone}
                </p>
              ) : null}
            </div>
          </div>

          <ul className="p-2" aria-label="User pages">
            {profileActions.map((action, index) => (
              <li key={action.label}>
                <Link
                  ref={index === 0 ? firstActionRef : undefined}
                  to={action.href}
                  role="menuitem"
                  onClick={() => closeMenu()}
                  className="hover:bg-brand-50 focus-visible:ring-brand-400/70 dark:hover:bg-brand-500/12 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                  <span
                    className="text-brand-700 dark:text-brand-300"
                    aria-hidden="true"
                  >
                    {action.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="text-neutral block text-sm font-semibold">
                      {action.label}
                    </span>
                    <span className="text-text-muted block truncate text-xs">
                      {action.description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-border border-t p-2">
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="text-neutral hover:bg-brand-50 focus-visible:ring-brand-400/70 dark:hover:bg-brand-500/12 flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
              <FiLogOut
                size={18}
                className="text-brand-700 dark:text-brand-300"
                aria-hidden="true"
              />
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileDropdown;
