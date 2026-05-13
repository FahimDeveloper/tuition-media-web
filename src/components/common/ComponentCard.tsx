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
      className={`border-border bg-surface-elevated rounded-2xl border ${className}`}
    >
      <div className="px-6 py-5">
        <h3 className="text-text-strong text-base font-medium">{title}</h3>
        {desc && <p className="text-text-muted mt-1 text-sm">{desc}</p>}
      </div>

      <div className="border-border border-t p-4 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
