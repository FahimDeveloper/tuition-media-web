import type { ReactNode } from "react";

type ProfileInfoItemProps = {
  label: string;
  value: ReactNode;
};

export default function ProfileInfoItem({
  label,
  value,
}: ProfileInfoItemProps) {
  return (
    <div>
      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
        {value}
      </p>
    </div>
  );
}
