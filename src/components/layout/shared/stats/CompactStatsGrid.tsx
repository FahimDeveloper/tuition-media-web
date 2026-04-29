import {useEffect, useRef, useState} from 'react';
import type {IconType} from 'react-icons';

export type CompactStatItem = {
  label: string;
  value: number;
  icon: IconType;
  iconClassName: string;
};

type CompactStatsGridProps = {
  items: CompactStatItem[];
  ariaLabel?: string;
  className?: string;
};

const getColumnCount = (width: number) => {
  if (width >= 1440) {
    return 6;
  }

  if (width >= 1120) {
    return 4;
  }

  if (width >= 840) {
    return 3;
  }

  if (width >= 520) {
    return 2;
  }

  return 1;
};

const cardBaseClassName =
  'flex h-full min-h-[112px] flex-col justify-center rounded-2xl border border-border bg-surface-elevated p-4 shadow-theme-sm sm:min-h-[120px] sm:p-5 lg:min-h-[118px]';

function CompactStatsCard({item}: {item: CompactStatItem}) {
  const Icon = item.icon;

  return (
    <article className={cardBaseClassName}>
      <div className="flex items-center gap-3">
        <div
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 sm:h-12 sm:w-12 lg:h-12 lg:w-12 ${item.iconClassName}`}
        >
          <span className="relative z-10 [&_svg]:h-5 [&_svg]:w-5 sm:[&_svg]:h-6 sm:[&_svg]:w-6 lg:[&_svg]:h-6 lg:[&_svg]:w-6">
            <Icon />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-2xl font-semibold leading-none text-text-strong sm:text-3xl lg:text-[1.75rem]">
            {item.value}
          </p>
          <p className="mt-2 text-sm font-medium leading-5 text-text-muted sm:text-theme-sm sm:leading-6">
            {item.label}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function CompactStatsGrid({
  items,
  ariaLabel,
  className = '',
}: CompactStatsGridProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return undefined;
    }

    const updateWidth = () => {
      setContainerWidth(sectionElement.getBoundingClientRect().width);
    };

    updateWidth();

    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(sectionElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const columnCount = getColumnCount(containerWidth);

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel}
      className={`grid gap-4 md:gap-5 xl:gap-4 ${className}`.trim()}
      style={{gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`}}
    >
      {items.map((item) => (
        <CompactStatsCard key={item.label} item={item} />
      ))}
    </section>
  );
}
