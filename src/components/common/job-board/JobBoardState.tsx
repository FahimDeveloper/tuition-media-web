type JobBoardStateProps = {
  title: string;
  description?: string;
  wrapperClassName?: string;
  panelClassName?: string;
  titleClassName?: string;
};

export default function JobBoardState({
  title,
  description,
  wrapperClassName = "",
  panelClassName = "",
  titleClassName = "",
}: JobBoardStateProps) {
  return (
    <section className={wrapperClassName}>
      <div
        className={[
          "border-brand-200/70 bg-surface-elevated shadow-theme-md dark:border-border mx-auto max-w-3xl rounded-3xl border p-8 text-center",
          panelClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <h2
          className={["text-text-strong text-2xl font-bold", titleClassName]
            .filter(Boolean)
            .join(" ")}
        >
          {title}
        </h2>
        {description ? (
          <p className="text-text-muted mx-auto mt-3 max-w-md text-sm leading-6">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
