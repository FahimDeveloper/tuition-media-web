import { type ReactNode } from "react";
import { Typography } from "antd";
import { FiBookOpen, FiClock, FiPhoneCall } from "react-icons/fi";
import LeadForm from "@/components/layout/forms/LeadForm";

const { Title, Paragraph } = Typography;

const benefits: Benefit[] = [
  {
    title: "Free demo class",
    description: "Book a demo before choosing a tutor.",
    icon: <FiBookOpen size={18} />,
  },
  {
    title: "Quick callback",
    description: "Our team will contact you shortly.",
    icon: <FiPhoneCall size={18} />,
  },
  {
    title: "Easy scheduling",
    description: "Pick a time that works for you.",
    icon: <FiClock size={18} />,
  },
];

type Benefit = {
  title: string;
  description: string;
  icon: ReactNode;
};

export default function BookDemoClass() {
  return (
    <main className="from-brand-50 via-page to-page text-text-strong dark:from-surface-strong dark:via-page dark:to-page min-h-screen bg-linear-to-b transition-colors duration-300">
      <section className="relative overflow-hidden py-20">
        <BackgroundDecoration />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_520px] lg:items-center lg:gap-12">
            <div className="order-2 max-w-2xl text-center md:mx-auto lg:order-1 lg:mx-0 lg:text-left">
              <Title
                level={1}
                className="font-poppins! text-text-strong! mb-0! hidden text-4xl! leading-tight! font-extrabold! sm:text-5xl! lg:block lg:text-6xl!"
              >
                Book a Demo Class
              </Title>

              <Paragraph className="text-text-muted! mt-5! mb-0! hidden text-base! leading-relaxed! sm:text-lg! lg:block">
                Share your name and phone number. Our team will call you to
                schedule a free demo class with a suitable tutor.
              </Paragraph>

              <div className="mt-8 grid gap-3 md:grid-cols-3 lg:grid-cols-1">
                {benefits.map((benefit) => (
                  <BenefitCard key={benefit.title} benefit={benefit} />
                ))}
              </div>
            </div>

            <div className="border-brand-200/20 bg-surface shadow-theme-xl rounded-[28px] border p-5 backdrop-blur-sm sm:p-6 lg:order-2 lg:p-7">
              <div className="border-border bg-surface-elevated/80 rounded-2xl border p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                    <FiPhoneCall size={20} />
                  </div>

                  <div>
                    <h3 className="font-poppins text-text-strong text-xl font-bold">
                      Request a callback
                    </h3>

                    <p className="text-text-strong/75 mt-2 text-sm leading-relaxed">
                      Enter your name and phone number. Our team will call you
                      back to help match the right tutor.
                    </p>
                  </div>
                </div>
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

type BenefitCardProps = {
  benefit: Benefit;
};

const BenefitCard = ({ benefit }: BenefitCardProps) => {
  return (
    <article className="border-border bg-surface-elevated/82 shadow-theme-xs dark:bg-surface-muted flex items-center gap-3 rounded-2xl border p-4 text-start backdrop-blur">
      <div className="border-brand-100 bg-brand-50 text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/15 dark:text-brand-300 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border">
        {benefit.icon}
      </div>
      <div>
        <h3 className="text-text-strong text-sm font-semibold sm:text-base">
          {benefit.title}
        </h3>
        <p className="text-text-muted mt-1 text-sm leading-relaxed">
          {benefit.description}
        </p>
      </div>
    </article>
  );
};

const BackgroundDecoration = () => {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--color-brand-400)_22%,transparent),transparent_50%),radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--color-brand-600)_16%,transparent),transparent_45%)]"
      aria-hidden="true"
    />
  );
};
