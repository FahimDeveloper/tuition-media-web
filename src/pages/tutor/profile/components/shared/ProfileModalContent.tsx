import type { ReactNode } from "react";
import { Button } from "antd";

type ProfileModalContentProps = {
  children: ReactNode;
};

type ProfileModalHeaderProps = {
  title: string;
  description: string;
};

export default function ProfileModalContent({
  children,
}: ProfileModalContentProps) {
  return (
    <div className="no-scrollbar relative flex h-fit max-h-[90vh] w-full max-w-175 flex-col overflow-y-auto rounded-3xl bg-white p-4 lg:p-8 lg:pb-6 dark:bg-gray-900">
      {children}
    </div>
  );
}

export function ProfileModalHeader({
  title,
  description,
}: ProfileModalHeaderProps) {
  return (
    <div className="px-2 pr-14">
      <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
        {title}
      </h4>
      <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

export function ProfileModalActions({
  isSaving = false,
  onCancel,
}: {
  isSaving?: boolean;
  onCancel: () => void;
}) {
  return (
    <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
      <Button disabled={isSaving} onClick={onCancel}>
        Close
      </Button>
      <Button type="primary" htmlType="submit" loading={isSaving}>
        Save Changes
      </Button>
    </div>
  );
}
