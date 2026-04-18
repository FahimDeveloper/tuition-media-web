import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector} from '@/hooks/useAppHooks';
import {selectCurrentUser} from '@/redux/features/auth/authSlice';

const FALLBACK_NAME = 'Account';
const FALLBACK_BIO =
  'Add a short bio to help guardians and students understand your teaching background.';
const FALLBACK_LOCATION = 'Location not available';
const FALLBACK_MEMBER_SINCE = 'Member since recently';

type ProfileSummaryStoreUser = NonNullable<
  ReturnType<typeof selectCurrentUser>
> & {
  bio?: string | null;
  city?: string | null;
  location?: string | null;
};

const getTrimmedValue = (value?: string | null) => {
  const trimmedValue = value?.trim();

  return trimmedValue ? trimmedValue : null;
};

const getUserDisplayName = (
  firstName?: string | null,
  lastName?: string | null,
  fallbackEmail?: string | null,
) => {
  const fullName = [firstName, lastName]
    .map((value) => getTrimmedValue(value))
    .filter((value): value is string => Boolean(value))
    .join(' ');

  return fullName || getTrimmedValue(fallbackEmail) || FALLBACK_NAME;
};

const getUserInitials = (
  firstName?: string | null,
  lastName?: string | null,
  fallbackEmail?: string | null,
) => {
  const initials = [firstName, lastName]
    .map((value) => getTrimmedValue(value))
    .filter((value): value is string => Boolean(value))
    .map((value) => value.charAt(0).toUpperCase())
    .join('');

  if (initials) {
    return initials.slice(0, 2);
  }

  const fallbackCharacter = getTrimmedValue(fallbackEmail)
    ?.charAt(0)
    .toUpperCase();

  return fallbackCharacter || 'A';
};

const getAvatarSource = (
  avatar?: string | null,
  image?: string | null,
  profileImage?: string | null,
  legacyProfileImage?: string | null,
) =>
  [avatar, image, profileImage, legacyProfileImage].find(
    (value) => typeof value === 'string' && value.trim().length > 0,
  ) ?? null;

const getBioText = (bio?: string | null) =>
  getTrimmedValue(bio) || FALLBACK_BIO;

const getLocationText = (city?: string | null, location?: string | null) => {
  const locationParts = [location, city]
    .map((value) => getTrimmedValue(value))
    .filter((value): value is string => Boolean(value));

  return locationParts.length > 0
    ? locationParts.join(', ')
    : FALLBACK_LOCATION;
};

const getMemberSinceLabel = (createdAt?: string | null) => {
  const joinedDate = getTrimmedValue(createdAt);

  if (!joinedDate) {
    return FALLBACK_MEMBER_SINCE;
  }

  const parsedDate = new Date(joinedDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return FALLBACK_MEMBER_SINCE;
  }

  return `Member since ${parsedDate.getFullYear()}`;
};

type ProfileAvatarProps = {
  avatarSrc: string | null;
  alt: string;
  initials: string;
};

const ProfileAvatar = ({avatarSrc, alt, initials}: ProfileAvatarProps) => {
  const [failedAvatarSrc, setFailedAvatarSrc] = useState<string | null>(null);
  const shouldRenderImage = Boolean(avatarSrc && avatarSrc !== failedAvatarSrc);

  if (shouldRenderImage && avatarSrc) {
    return (
      <img
        src={avatarSrc}
        alt={alt}
        className="relative inline-block h-12 w-12 rounded-full object-cover object-center ring-1 ring-brand-200"
        onError={() => setFailedAvatarSrc(avatarSrc)}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 font-poppins text-sm font-bold text-brand-700 ring-1 ring-brand-200"
    >
      {initials}
    </span>
  );
};

const ProfileSummary = () => {
  const currentUser = useAppSelector(
    selectCurrentUser,
  ) as ProfileSummaryStoreUser | null;

  const displayName = getUserDisplayName(
    currentUser?.first_name,
    currentUser?.last_name,
    currentUser?.email,
  );

  const userInitials = getUserInitials(
    currentUser?.first_name,
    currentUser?.last_name,
    currentUser?.email,
  );

  const avatarSrc = getAvatarSource(
    currentUser?.avatar,
    currentUser?.image,
    currentUser?.profileImage,
    currentUser?.profile_image,
  );

  const bioText = getBioText(currentUser?.bio);
  const memberSinceLabel = getMemberSinceLabel(currentUser?.createdAt);
  const locationText = getLocationText(
    currentUser?.city,
    currentUser?.location,
  );

  const avatarAlt = `${displayName} profile`;

  return (
    <div className="w-full max-w-full whitespace-normal wrap-break-word rounded-lg border border-gray-200 bg-white p-4 text-sm font-normal text-gray-600 shadow-theme-sm focus:outline-none dark:border-gray-800 dark:bg-white/3 dark:text-gray-400">
      <div className="mb-2 flex items-center justify-between gap-4">
        <ProfileAvatar
          avatarSrc={avatarSrc}
          alt={avatarAlt}
          initials={userInitials}
        />

        <Link
          to="/dashboard/profile"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-brand-600 px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-text-on-brand shadow-theme-xs transition-colors duration-200 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 dark:bg-brand-500 dark:hover:bg-brand-400"
        >
          Visit Profile
        </Link>
      </div>

      <h6 className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-base font-medium leading-relaxed tracking-normal text-gray-900 dark:text-white">
        <span className="min-w-0 wrap-break-word">{displayName}</span>
        <span aria-hidden="true" className="text-gray-400 dark:text-gray-500">
          &bull;
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {memberSinceLabel}
        </span>
      </h6>

      <p className="block wrap-break-word text-sm leading-6 text-gray-600 dark:text-gray-400">
        {bioText}
      </p>

      <div className="mt-6 flex items-center gap-8 border-t border-gray-200 pt-4 dark:border-gray-800">
        <p className="flex min-w-0 items-start gap-1 wrap-break-word text-xs text-gray-600 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="-mt-0.5 h-3.5 w-3.5 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <span className="wrap-break-word">{locationText}</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileSummary;
