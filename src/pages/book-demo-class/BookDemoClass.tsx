import {type ReactNode} from 'react';
import {Card, Typography} from 'antd';
import {FiBookOpen, FiClock, FiPhoneCall} from 'react-icons/fi';
import LeadForm from '@/components/layout/forms/LeadForm';

const {Title, Paragraph} = Typography;

const benefits: Benefit[] = [
  {
    title: 'Free demo class',
    description: 'Book a demo before choosing a tutor.',
    icon: <FiBookOpen size={18} />,
  },
  {
    title: 'Quick callback',
    description: 'Our team will contact you shortly.',
    icon: <FiPhoneCall size={18} />,
  },
  {
    title: 'Easy scheduling',
    description: 'Pick a time that works for you.',
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
    <main className="min-h-screen bg-linear-to-b from-brand-50 via-page to-page text-text-strong transition-colors duration-300 dark:from-surface-strong dark:via-page dark:to-page">
      <section className="relative overflow-hidden py-20">
        <BackgroundDecoration />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center lg:gap-12">
            <div className="order-2 mx-auto max-w-2xl text-center lg:order-1 lg:mx-0 lg:text-left">
              <Title
                level={1}
                className="hidden lg:block mb-0! font-poppins! text-4xl! font-extrabold! leading-tight! text-text-strong! sm:text-5xl! lg:text-6xl!"
              >
                Book a Demo Class
              </Title>

              <Paragraph className="hidden lg:block mt-5! mb-0! text-base! leading-relaxed! text-text-muted! sm:text-lg!">
                Share your name and phone number. Our team will call you to
                schedule a free demo class with a suitable tutor.
              </Paragraph>

              <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {benefits.map((benefit) => (
                  <BenefitCard key={benefit.title} benefit={benefit} />
                ))}
              </div>
            </div>

            <Card
              className="order-1 w-full max-w-md justify-self-center rounded-2xl! border-border! bg-surface-elevated! shadow-theme-xl! lg:order-2 lg:justify-self-end"
              styles={{body: {padding: 28}}}
            >
              <div className="mb-6 flex items-start gap-3">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/20">
                  <FiPhoneCall size={20} />
                </div>

                <div>
                  <Title level={2} className="mb-0! text-xl! text-text-strong!">
                    Book your demo
                  </Title>
                  <Paragraph className="mt-2! mb-0! text-sm! leading-relaxed! text-text-muted!">
                    Enter your details and we will contact you shortly.
                  </Paragraph>
                </div>
              </div>
              <LeadForm />
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

type BenefitCardProps = {
  benefit: Benefit;
};

const BenefitCard = ({benefit}: BenefitCardProps) => {
  return (
    <article className="flex items-start gap-3 rounded-2xl border border-border bg-surface-elevated/82 p-4 shadow-theme-xs backdrop-blur dark:bg-surface-muted">
      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/15 dark:text-brand-300">
        {benefit.icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-text-strong sm:text-base">
          {benefit.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-text-muted">
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
