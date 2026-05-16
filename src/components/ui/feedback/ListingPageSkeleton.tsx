import { Skeleton } from "antd";

type ListingPageSkeletonProps = {
  cardCount?: number;
  showHeader?: boolean;
  showSearchPanel?: boolean;
  className?: string;
};

const DEFAULT_CARD_COUNT = 6;

function ListingCardSkeleton() {
  return (
    <div className="border-border bg-surface-elevated shadow-theme-xs rounded-2xl border p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Skeleton.Input active size="small" className="!h-5 !w-32" />
          <Skeleton.Input active className="!mt-3 !h-6 !w-full" />
        </div>

        <Skeleton.Button
          active
          size="small"
          className="!h-8 !w-20 !rounded-full"
        />
      </div>

      <div className="space-y-3">
        <Skeleton.Input active size="small" className="!w-44" />
        <Skeleton.Input active size="small" className="!w-36" />
        <Skeleton.Input active size="small" className="!w-52" />
      </div>

      <div className="border-border mt-5 border-t pt-4">
        <div className="flex items-center justify-between gap-4">
          <Skeleton.Input active size="small" className="!w-28" />
          <Skeleton.Button active className="!h-10 !w-28 !rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function ListingPageSkeleton({
  cardCount = DEFAULT_CARD_COUNT,
  showHeader = true,
  showSearchPanel = true,
  className = "",
}: ListingPageSkeletonProps) {
  return (
    <section
      className={`from-brand-50 via-page to-page dark:from-surface-strong dark:via-page dark:to-page relative overflow-hidden bg-linear-to-b py-20 transition-colors duration-300 sm:py-24 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-[radial-gradient(circle_at_top_left,rgba(102,153,207,0.22),transparent_50%),radial-gradient(circle_at_top_right,rgba(63,114,175,0.16),transparent_45%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeader ? (
          <div className="mb-8">
            <Skeleton.Button
              active
              size="small"
              className="!h-8 !w-64 !rounded-full"
            />
          </div>
        ) : null}

        {showSearchPanel ? (
          <div className="border-border bg-surface-elevated/90 shadow-theme-xs rounded-2xl border p-4 backdrop-blur sm:p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
              <Skeleton.Input active className="!h-12 !w-full !rounded-xl" />

              <div className="grid grid-cols-2 gap-3 sm:flex">
                <Skeleton.Button
                  active
                  className="!h-12 !w-full !rounded-xl sm:!w-36"
                />
                <Skeleton.Button
                  active
                  className="!h-12 !w-full !rounded-xl sm:!w-32"
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: cardCount }).map((_, index) => (
            <ListingCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
