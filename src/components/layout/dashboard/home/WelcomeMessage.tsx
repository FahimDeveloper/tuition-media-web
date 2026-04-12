import {useEffect, useState} from 'react';
import {useAppSelector} from '@/hooks/useAppHooks';
import {selectCurrentUser} from '@/redux/features/auth/authSlice';

const SUPPORTING_COPY =
  'Welcome back to your dashboard. Review your latest activity and stay ready for new tuition opportunities.';
const FALLBACK_NAME = 'there';

const getGreetingByHour = (hour: number) => {
  if (hour < 12) {
    return 'Good morning';
  }

  if (hour < 18) {
    return 'Good afternoon';
  }

  return 'Good evening';
};

const getUserDisplayName = (
  firstName?: string | null,
  lastName?: string | null,
  fallbackEmail?: string | null,
) => {
  const fullName = [firstName, lastName]
    .filter((value): value is string => Boolean(value?.trim()))
    .join(' ')
    .trim();

  if (fullName) {
    return fullName;
  }

  return fallbackEmail?.trim() || FALLBACK_NAME;
};

export default function WelcomeMessage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const [greeting, setGreeting] = useState(() =>
    getGreetingByHour(new Date().getHours()),
  );

  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(getGreetingByHour(new Date().getHours()));
    };

    updateGreeting();

    const intervalId = window.setInterval(updateGreeting, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const displayName = getUserDisplayName(
    currentUser?.first_name,
    currentUser?.last_name,
    currentUser?.email,
  );

  return (
    <section
      aria-labelledby="dashboard-welcome-name"
      className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 sm:p-6 lg:p-7"
    >
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700 dark:text-brand-300">
          {greeting}
        </p>
        <h2
          id="dashboard-welcome-name"
          className="mt-3 font-poppins text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl lg:text-[2rem]"
        >
          {displayName}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400 sm:text-base">
          {SUPPORTING_COPY}
        </p>
      </div>
    </section>
  );
}
