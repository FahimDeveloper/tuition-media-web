import {Link} from 'react-router-dom';
import {TEXT} from '../signup.constants';

export const SignupBrandBadge = () => (
  <Link
    to="/"
    className="inline-flex items-center gap-3 rounded-full border border-brand-200/70 bg-brand-50/80 px-4 py-2 text-sm font-semibold text-brand-700 dark:border-gray-800 dark:bg-white/3 dark:text-brand-300"
  >
    <span className="font-poppins text-base font-extrabold tracking-tight text-text-strong dark:text-white">
      {TEXT.brandPrimary}{' '}
      <span className="text-brand-600 dark:text-brand-300">
        {TEXT.brandAccent}
      </span>
    </span>
    <span className="h-2 w-2 rounded-full bg-brand-500" />
    <span className="text-[11px] uppercase tracking-[0.18em] text-brand-700/80 dark:text-brand-300/80">
      {TEXT.badgeLabel}
    </span>
  </Link>
);

export const SignupImagePanel = () => (
  <div className="relative overflow-hidden aspect-5/4 sm:aspect-16/10 lg:w-[42%] lg:aspect-auto xl:w-[46%]">
    <img
      src="/signupImage.jpg"
      alt="Join as Tutor"
      className="absolute inset-0 h-full w-full object-cover"
    />
  </div>
);
