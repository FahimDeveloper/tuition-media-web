import type {ApexOptions} from 'apexcharts';
import Chart from 'react-apexcharts';
import {Link} from 'react-router-dom';
import {MdArrowRightAlt} from 'react-icons/md';
import {useAppSelector} from '@/hooks/useAppHooks';
import {selectCurrentUser} from '@/redux/features/auth/authSlice';

const DEFAULT_PROGRESS = 72;
const CHART_HEIGHT = 330;
const TABLET_CHART_HEIGHT = 300;
const MOBILE_CHART_HEIGHT = 260;
const TRACK_COLOR = 'rgba(152, 162, 179, 0.22)';

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

  return fullName || getTrimmedValue(fallbackEmail) || 'your';
};

export default function ProfileComplete() {
  const currentUser = useAppSelector(selectCurrentUser);
  const displayName = getUserDisplayName(
    currentUser?.first_name,
    currentUser?.last_name,
    currentUser?.email,
  );

  const supportingCopy =
    displayName === 'your'
      ? 'A complete and organized profile may get better responses.'
      : `${displayName}, a complete and organized profile may get better responses.`;

  const series = [DEFAULT_PROGRESS];

  const options: ApexOptions = {
    colors: ['var(--color-brand-600)'],
    chart: {
      fontFamily: 'Manrope, sans-serif',
      type: 'radialBar',
      height: CHART_HEIGHT,
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
      active: {
        filter: {
          type: 'none',
        },
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: '78%',
        },
        track: {
          background: TRACK_COLOR,
          strokeWidth: '100%',
          margin: 6,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: '2rem',
            fontWeight: '700',
            offsetY: -34,
            color: 'var(--color-text-strong)',
            formatter: (value) => `${Math.round(value)}%`,
          },
        },
      },
    },
    fill: {
      type: 'solid',
      colors: ['var(--color-brand-600)'],
    },
    stroke: {
      lineCap: 'round',
    },
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    labels: ['Progress'],
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: TABLET_CHART_HEIGHT,
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                value: {
                  fontSize: '1.875rem',
                  offsetY: -30,
                },
              },
            },
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            height: MOBILE_CHART_HEIGHT,
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '74%',
              },
              dataLabels: {
                value: {
                  fontSize: '1.625rem',
                  offsetY: -24,
                },
              },
            },
          },
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden min-h-full rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="rounded-2xl px-4 pt-4 pb-6 sm:px-5 sm:pt-5 sm:pb-8 lg:px-6 lg:pt-6 lg:pb-11">
        <div className="flex justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Profile Completion
            </h3>
            <p className="mt-1 max-w-sm text-theme-sm leading-6 text-gray-500 dark:text-gray-400">
              {supportingCopy}
            </p>
          </div>
        </div>
        <div className="relative mt-4 sm:mt-5">
          <div
            className="mx-auto max-h-65 max-w-65 sm:max-h-75 sm:max-w-75 lg:max-h-82.5 lg:max-w-82.5"
            id="chartDarkStyle"
          >
            <Chart
              options={options}
              series={series}
              type="radialBar"
              height={CHART_HEIGHT}
            />
          </div>

          {/* Will use this for profiel completed  */}
          {/* <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
            Completed
          </span> */}
        </div>
        <div className="mt-6 flex justify-end">
          <Link
            to="/dashboard/profile"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-brand-700 transition-colors duration-200 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 dark:text-brand-300 dark:hover:text-brand-200"
          >
            Complete Profile <MdArrowRightAlt className="h-5 w-5 shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
