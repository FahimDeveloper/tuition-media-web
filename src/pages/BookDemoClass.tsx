import {type ReactNode, useState} from 'react';
import {Alert, Button, Card, Form, Input, Typography} from 'antd';
import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiPhoneCall,
} from 'react-icons/fi';

const {Title, Paragraph, Text} = Typography;

const PHONE_PATTERN = /^(?:\+8801\d{9}|01\d{9})$/;

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

type DemoClassFormValues = {
  name: string;
  phone: string;
};

type Feedback = {
  type: 'success' | 'error';
  message: string;
} | null;

const cleanPhoneNumber = (phone = '') => phone.replace(/[() -]/g, '').trim();

const isValidPhoneNumber = (phone = '') =>
  PHONE_PATTERN.test(cleanPhoneNumber(phone));

export default function BookDemoClass() {
  const [form] = Form.useForm<DemoClassFormValues>();
  const [feedback, setFeedback] = useState<Feedback>(null);

  const handleSubmit = (values: DemoClassFormValues) => {
    if (!isValidPhoneNumber(values.phone)) {
      setFeedback({
        type: 'error',
        message: 'Please enter a valid Bangladeshi mobile number.',
      });
      return;
    }

    // Replace this with your API call when the booking flow is ready.
    setFeedback({
      type: 'success',
      message: 'Thank you. Our team will contact you to book your demo class.',
    });

    form.resetFields();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-brand-900 dark:via-brand-900 dark:to-brand-800 text-gray-900 dark:text-text-on-brand">
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="hidden dark:block">
          <BackgroundDecoration />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center lg:gap-12">
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              <Title
                level={1}
                className="!mb-0 !font-poppins !text-4xl !font-extrabold !leading-tight !text-gray-900 dark:!text-text-on-brand sm:!text-5xl lg:!text-6xl"
              >
                Book a Demo Class
              </Title>

              <Paragraph className="!mt-5 !mb-0 !text-base !leading-relaxed !text-gray-600 dark:!text-text-on-brand/80 sm:!text-lg">
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
              className="w-full max-w-md justify-self-center !rounded-[28px] !border-gray-200 dark:!border-brand-200/20 !bg-white dark:!bg-surface-elevated/95 !shadow-lg dark:!shadow-theme-xl lg:justify-self-end"
              styles={{body: {padding: 24}}}
            >
              <div className="mb-6 flex items-start gap-3">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                  <FiPhoneCall size={20} />
                </div>

                <div>
                  <Title
                    level={2}
                    className="!mb-0 !text-xl !text-gray-900 dark:!text-text-strong"
                  >
                    Book your demo
                  </Title>
                  <Paragraph className="!mt-2 !mb-0 !text-sm !leading-relaxed !text-gray-600 dark:!text-text-strong/75">
                    Enter your details and we will contact you shortly.
                  </Paragraph>
                </div>
              </div>

              <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={handleSubmit}
                onValuesChange={() => setFeedback(null)}
              >
                <Form.Item
                  label={<Text strong>Name</Text>}
                  name="name"
                  rules={[{required: true, message: 'Please enter your name.'}]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your name"
                    autoComplete="name"
                    className="!min-h-14 !rounded-xl"
                  />
                </Form.Item>

                <Form.Item
                  label={<Text strong>Phone number</Text>}
                  name="phone"
                  extra="Accepted formats: 01XXXXXXXXX and +8801XXXXXXXXX."
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your phone number.',
                    },
                    {
                      validator: (_, value) => {
                        if (!value || isValidPhoneNumber(value)) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error('Enter a valid Bangladeshi mobile number.'),
                        );
                      },
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="01XXXXXXXXX or +8801XXXXXXXXX"
                    inputMode="tel"
                    autoComplete="tel"
                    className="!min-h-14 !rounded-xl"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  className="!mt-1 !min-h-14 !rounded-xl !bg-brand-600 !text-base !font-semibold hover:!bg-brand-700"
                >
                  Book Demo Class
                  <FiArrowRight size={18} aria-hidden="true" />
                </Button>

                {feedback ? (
                  <Alert
                    className="!mt-4 !rounded-xl"
                    type={feedback.type}
                    message={feedback.message}
                    showIcon
                    icon={
                      feedback.type === 'success' ? (
                        <FiCheckCircle size={18} />
                      ) : undefined
                    }
                  />
                ) : null}
              </Form>
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
    <article className="flex items-start gap-3 rounded-2xl border border-gray-200 dark:border-brand-200/20 bg-white dark:bg-brand-50/10 p-4">
      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 dark:border-brand-300/30 bg-gray-100 dark:bg-brand-50/10 text-gray-700 dark:text-brand-100">
        {benefit.icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-text-on-brand sm:text-base">
          {benefit.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-text-on-brand/75">
          {benefit.description}
        </p>
      </div>
    </article>
  );
};

const BackgroundDecoration = () => {
  return (
    <div className="absolute inset-0 opacity-60" aria-hidden="true">
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-400/12 blur-3xl" />
      <div className="absolute -right-10 bottom-10 h-56 w-56 rounded-full bg-brand-300/10 blur-3xl" />
    </div>
  );
};
