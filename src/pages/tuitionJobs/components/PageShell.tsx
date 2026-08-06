export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="from-brand-50 to-page relative bg-linear-to-b py-20 sm:py-24">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-brand-300),transparent_50%)] opacity-20"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
