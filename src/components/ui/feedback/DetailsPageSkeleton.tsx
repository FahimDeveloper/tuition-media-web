import { Skeleton } from "antd";

type DetailsPageSkeletonProps = {
  showBreadcrumb?: boolean;
  showBackButton?: boolean;
  sections?: number;
  sidebarCards?: number;
  className?: string;
};

export default function DetailsPageSkeleton({
  showBreadcrumb = true,
  showBackButton = true,
  sections = 3,
  sidebarCards = 3,
  className = "",
}: DetailsPageSkeletonProps) {
  return (
    <div
      className={`border-border bg-surface-elevated rounded-2xl border p-5 lg:p-6 ${className}`}
    >
      {showBreadcrumb ? (
        <div className="mb-5">
          <Skeleton.Input active size="small" className="!w-44" />
        </div>
      ) : null}

      {showBackButton ? (
        <Skeleton.Button active className="!mb-5 !h-10 !w-24 !rounded-lg" />
      ) : null}

      <div className="border-border bg-surface-muted/40 overflow-hidden rounded-2xl border">
        <div className="border-border bg-surface-elevated border-b px-5 py-6">
          <div className="flex gap-2">
            <Skeleton.Button
              active
              size="small"
              className="!w-24 !rounded-full"
            />
            <Skeleton.Button
              active
              size="small"
              className="!w-20 !rounded-full"
            />
          </div>

          <Skeleton.Input active className="!mt-4 !h-9 !w-full max-w-3xl" />
        </div>

        <div className="grid gap-6 p-5 lg:grid-cols-[1fr_320px] lg:p-6">
          <div className="space-y-6">
            {Array.from({ length: sections }).map((_, sectionIndex) => (
              <section key={sectionIndex}>
                <Skeleton.Input active size="small" className="!w-44" />

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {Array.from({ length: 4 }).map((__, itemIndex) => (
                    <div
                      key={`${sectionIndex}-${itemIndex}`}
                      className="border-border bg-surface-elevated rounded-xl border p-3"
                    >
                      <Skeleton.Input active size="small" className="!w-28" />
                      <Skeleton.Input active className="!mt-3 !h-5 !w-40" />
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <div className="border-border bg-surface-elevated rounded-2xl border p-4">
              <Skeleton active paragraph={{ rows: 2 }} title={{ width: 180 }} />
            </div>
          </div>

          <aside className="space-y-4">
            {Array.from({ length: sidebarCards }).map((_, index) => (
              <div
                key={index}
                className="border-border bg-surface-elevated rounded-2xl border p-4"
              >
                <Skeleton
                  active
                  paragraph={{ rows: 3 }}
                  title={{ width: 140 }}
                />
              </div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}
