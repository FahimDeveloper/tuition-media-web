import type {CompactStatItem} from '@/components/layout/shared/stats/CompactStatsGrid';
import CompactStatsGrid from '@/components/layout/shared/stats/CompactStatsGrid';
import {
  HiOutlineBriefcase,
  HiOutlineCheckBadge,
  HiOutlineClipboardDocumentCheck,
  HiOutlineClipboardDocumentList,
  HiOutlineCreditCard,
  HiOutlineXCircle,
} from 'react-icons/hi2';

const statusStats: CompactStatItem[] = [
  {
    label: 'Applied',
    value: 0,
    icon: HiOutlineClipboardDocumentList,
    iconClassName:
      'bg-brand-50 text-brand-600 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:ring-brand-500/20',
  },
  {
    label: 'Shortlisted',
    value: 0,
    icon: HiOutlineClipboardDocumentCheck,
    iconClassName:
      'bg-blue-light-50 text-blue-light-700 ring-blue-light-100 dark:bg-blue-light-500/10 dark:text-blue-light-300 dark:ring-blue-light-500/20',
  },
  {
    label: 'Appointed',
    value: 0,
    icon: HiOutlineBriefcase,
    iconClassName:
      'bg-warning-50 text-warning-700 ring-warning-100 dark:bg-warning-500/10 dark:text-warning-300 dark:ring-warning-500/20',
  },
  {
    label: 'Confirmed',
    value: 0,
    icon: HiOutlineCheckBadge,
    iconClassName:
      'bg-success-50 text-success-700 ring-success-100 dark:bg-success-500/10 dark:text-success-300 dark:ring-success-500/20',
  },
  {
    label: 'Payment',
    value: 0,
    icon: HiOutlineCreditCard,
    iconClassName:
      'bg-success-50 text-success-700 ring-success-100 dark:bg-success-500/10 dark:text-success-300 dark:ring-success-500/20',
  },
  {
    label: 'Canceled',
    value: 0,
    icon: HiOutlineXCircle,
    iconClassName:
      'bg-error-50 text-error-700 ring-error-100 dark:bg-error-500/10 dark:text-error-300 dark:ring-error-500/20',
  },
];

export default function StatusStatsCards() {
  return (
    <CompactStatsGrid
      items={statusStats}
      ariaLabel="Tuition status statistics"
    />
  );
}
