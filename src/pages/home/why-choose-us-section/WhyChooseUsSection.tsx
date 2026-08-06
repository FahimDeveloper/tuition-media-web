import { Card } from "antd";
import {
  CustomerServiceOutlined,
  SafetyCertificateOutlined,
  LikeOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";

type Feature = {
  title: string;
  icon: ReactNode;
};

const features: Feature[] = [
  {
    title: "24/7 Live Support",
    icon: <CustomerServiceOutlined />,
  },
  {
    title: "Fast Responsive",
    icon: <ThunderboltOutlined />,
  },
  {
    title: "Safe Community",
    icon: <SafetyCertificateOutlined />,
  },
  {
    title: "Better Than Others",
    icon: <LikeOutlined />,
  },
];

export default function WhyChooseUsSection({
  imageSrc = "/home/why_choose_us.svg",
  imageAlt = "Support team helping students",
}) {
  return (
    <section className="bg-page w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center lg:mb-16 lg:text-left">
          <p className="font-poppins text-brand-600 dark:text-brand-300 mb-4 text-sm font-semibold tracking-[0.14em] uppercase sm:text-base">
            WHY CHOOSE US?
          </p>

          <h2 className="font-poppins text-text-strong mx-auto max-w-4xl text-3xl leading-tight font-extrabold sm:text-4xl lg:mx-0 lg:text-5xl">
            We intend to expand{" "}
            <span className="text-brand-600 dark:text-brand-300">
              Excellent
            </span>{" "}
            education.
          </h2>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:max-w-xl">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                icon={feature.icon}
              />
            ))}
          </div>

          <div className="mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="border-border bg-brand-50/80 shadow-theme-xl dark:bg-brand-500/12 rounded-[28px] border p-4 sm:p-5">
              <div className="bg-surface-elevated overflow-hidden rounded-2xl">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-64 w-full object-contain p-5 drop-shadow-xl sm:h-80 sm:p-7 lg:h-82.5 dark:drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, icon }: Feature) {
  return (
    <Card
      bordered={false}
      className="border-border bg-surface-elevated shadow-theme-md hover:shadow-theme-lg relative min-h-39 rounded-lg border transition duration-300 hover:-translate-y-1"
      bodyStyle={{ padding: 0 }}
    >
      <div className="flex min-h-39 items-center justify-center px-5 pt-10 text-center">
        <div className="bg-brand-600 text-text-on-brand shadow-theme-md dark:bg-brand-500/15 dark:text-brand-200 dark:ring-brand-400/20 ring-brand-100 absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full text-3xl ring-4">
          {icon}
        </div>

        <h3 className="font-poppins text-text-strong text-lg font-semibold sm:text-xl">
          {title}
        </h3>
      </div>
    </Card>
  );
}
