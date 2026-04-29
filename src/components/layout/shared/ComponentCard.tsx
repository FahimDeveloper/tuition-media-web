interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
}) => {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface-elevated ${className}`}
    >
      <div className="px-6 py-5">
        <h3 className="text-base font-medium text-text-strong">
          {title}
        </h3>
        {desc && (
          <p className="mt-1 text-sm text-text-muted">
            {desc}
          </p>
        )}
      </div>

      <div className="border-t border-border p-4 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
