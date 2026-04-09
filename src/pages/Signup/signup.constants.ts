import {type GenderValue} from './signup.types';

export const TEXT = {
  brandPrimary: 'Tuition',
  brandAccent: 'Media',
  badgeLabel: 'Tutor signup',
  eyebrow: 'Create your account',
  title: 'Set up your tutor profile',
  intro:
    'Start with the essentials so Tuition Media can understand who you are, where you teach, and how to present your profile clearly.',
  firstNameLabel: 'First name',
  firstNamePlaceholder: 'Your first name',
  lastNameLabel: 'Last name',
  lastNamePlaceholder: 'Your last name',
  fullNameRequired: 'Please enter your name.',
  phoneLabel: 'Phone',
  phonePlaceholder: '01XXXXXXXXX or +8801XXXXXXXXX',
  phoneHint: 'Use a Bangladeshi mobile number.',
  phoneInvalid: 'Please enter a valid Bangladeshi mobile number.',
  emailLabel: 'Email address',
  emailPlaceholder: 'you@example.com',
  genderLabel: 'Gender',
  genderPlaceholder: 'Select gender',
  cityLabel: 'City',
  cityPlaceholder: 'Select city',
  locationLabel: 'Location',
  locationPlaceholder: 'Select location',
  locationDisabledPlaceholder: 'Select a city first',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Create a password',
  passwordHint: 'Use at least 8 characters with letters and numbers.',
  confirmPasswordLabel: 'Confirm password',
  confirmPasswordPlaceholder: 'Re-enter your password',
  capsLockWarning: 'Caps Lock is on.',
  submit: 'Create account',
  submitting: 'Creating account...',
  genericError: 'Something went wrong. Please try again.',
  confirmPasswordMismatch: 'Passwords do not match.',
} as const;

export const GENDER_OPTIONS: {label: string; value: GenderValue}[] = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'},
  {label: 'Prefer not to say', value: 'prefer_not_to_say'},
];

export const STYLES = {
  section:
    'relative overflow-hidden bg-[linear-gradient(180deg,rgba(242,247,252,0.98)_0%,rgba(249,247,247,1)_100%)] px-4 pb-20 pt-28 transition-colors duration-300 dark:bg-[linear-gradient(180deg,rgba(12,17,29,0.98)_0%,rgba(16,24,40,1)_100%)] sm:px-6 sm:pb-24 sm:pt-32 lg:px-8',
  backgroundGlow:
    'pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,rgba(102,153,207,0.18),transparent_42%),radial-gradient(circle_at_top_right,rgba(63,114,175,0.12),transparent_32%)]',
  cardShell:
    'overflow-hidden rounded-[30px] border border-brand-100/80 bg-surface shadow-[0_24px_60px_rgba(17,45,78,0.12)] dark:border-gray-800 dark:bg-gray-dark dark:shadow-[0_28px_70px_rgba(3,7,18,0.4)]',
  input:
    '!h-12 !rounded-xl !border-brand-200/80 !bg-brand-50/70 !px-3 !text-text-strong !shadow-none transition-all duration-200 hover:!border-brand-400 focus-within:!border-brand-500 focus-within:!bg-white focus-within:!shadow-[0_0_0_4px_rgba(63,114,175,0.12)] dark:!border-gray-700 dark:!bg-white/[0.03] dark:!text-white/90 dark:hover:!border-brand-400 dark:focus-within:!bg-gray-900',
  select:
    '[&_.ant-select-selector]:!h-12 [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!border-brand-200/80 [&_.ant-select-selector]:!bg-brand-50/70 [&_.ant-select-selector]:!px-3 [&_.ant-select-selector]:!shadow-none [&_.ant-select-selection-item]:!text-text-strong [&_.ant-select-selection-placeholder]:!text-text-strong/45 [&_.ant-select-arrow]:!text-brand-500 transition-all duration-200 hover:[&_.ant-select-selector]:!border-brand-400 focus-within:[&_.ant-select-selector]:!border-brand-500 focus-within:[&_.ant-select-selector]:!bg-white focus-within:[&_.ant-select-selector]:!shadow-[0_0_0_4px_rgba(63,114,175,0.12)] dark:[&_.ant-select-selector]:!border-gray-700 dark:[&_.ant-select-selector]:!bg-white/[0.03] dark:[&_.ant-select-selection-item]:!text-white/90 dark:[&_.ant-select-selection-placeholder]:!text-white/30 dark:[&_.ant-select-arrow]:!text-brand-300 dark:hover:[&_.ant-select-selector]:!border-brand-400 dark:focus-within:[&_.ant-select-selector]:!bg-gray-900',
  primaryButton:
    '!h-12 !rounded-xl !border-0 !bg-brand-600 !font-semibold !text-text-on-brand !shadow-lg !shadow-brand-600/20 transition-all duration-200 hover:!bg-brand-700 focus-visible:!outline-none focus-visible:!ring-4 focus-visible:!ring-brand-200/80',
  form: '[&_.ant-form-item]:mb-0 [&_.ant-form-item-explain-error]:!mt-2 [&_.ant-form-item-explain-error]:!text-xs [&_.ant-form-item-explain-error]:!font-medium [&_.ant-form-item-extra]:!mt-2 [&_.ant-form-item-extra]:!text-sm [&_.ant-form-item-extra]:!leading-5 [&_.ant-form-item-extra]:!text-text-strong/70 dark:[&_.ant-form-item-extra]:!text-gray-400 [&_.ant-form-item-label>label]:!pb-2 [&_.ant-form-item-label>label]:!font-semibold [&_.ant-form-item-label>label]:!text-text-strong dark:[&_.ant-form-item-label>label]:!text-white/90',
};
