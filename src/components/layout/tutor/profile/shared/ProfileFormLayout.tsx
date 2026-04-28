import type {ReactNode} from 'react';

type ProfileFormSectionProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export function ProfileFormSection({
  title,
  description,
  children,
}: ProfileFormSectionProps) {
  return (
    <div>
      {title ? (
        <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
          {title}
        </h5>
      ) : null}

      {description ? (
        <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      ) : null}

      {children}
    </div>
  );
}

export function ProfileFormGrid({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 gap-x-6 lg:grid-cols-2 ${className}`}>
      {children}
    </div>
  );
}

export function ProfileFormScrollArea({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`custom-scrollbar overflow-y-auto px-2 pb-3 ${className}`}>
      {children}
    </div>
  );
}
