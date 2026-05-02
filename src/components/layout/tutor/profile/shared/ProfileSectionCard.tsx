import type { ReactNode } from "react";

type ProfileSectionCardProps = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

export default function ProfileSectionCard({
  title,
  action,
  children,
}: ProfileSectionCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <h4 className="text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
            {title}
          </h4>

          {children}
        </div>

        {action}
      </div>
    </div>
  );
}

export function ProfileInfoGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
      {children}
    </div>
  );
}
