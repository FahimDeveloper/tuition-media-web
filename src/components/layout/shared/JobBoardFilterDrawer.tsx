import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  BookOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { FiSliders } from "react-icons/fi";

type FilterDateValue = unknown;

type FilterFormValues = {
  postedDateFrom?: FilterDateValue;
  postedDateTo?: FilterDateValue;
  country?: string;
  city?: string;
  areaLocation?: string;
  category?: string;
  courseClass?: string;
  subject?: string;
};

const categoryOptions = [
  { label: "School", value: "school" },
  { label: "College", value: "college" },
  { label: "University", value: "university" },
  { label: "Admission Test", value: "admission-test" },
  { label: "Language Learning", value: "language-learning" },
  { label: "Skill Development", value: "skill-development" },
];

const subjectOptions = [
  { label: "Mathematics", value: "mathematics" },
  { label: "English", value: "english" },
  { label: "Physics", value: "physics" },
  { label: "Chemistry", value: "chemistry" },
  { label: "Biology", value: "biology" },
  { label: "Bangla", value: "bangla" },
  { label: "ICT", value: "ict" },
  { label: "Accounting", value: "accounting" },
  { label: "Economics", value: "economics" },
];

const countryOptions = [
  { label: "Bangladesh", value: "bangladesh" },
  { label: "India", value: "india" },
  { label: "Pakistan", value: "pakistan" },
  { label: "Nepal", value: "nepal" },
];

const drawerBodyStyles = {
  padding: 0,
  background: "var(--color-surface-muted)",
  display: "flex",
  flexDirection: "column" as const,
  height: "100%",
};

const formItemClassName =
  "[&_.ant-form-item-label>label]:text-xs [&_.ant-form-item-label>label]:font-semibold [&_.ant-form-item-label>label]:uppercase [&_.ant-form-item-label>label]:tracking-[0.12em] [&_.ant-form-item-label>label]:text-text-muted [&_.ant-form-item]:mb-0";

const controlClassName =
  "h-11 rounded-lg border-border bg-surface-elevated text-text-strong shadow-theme-xs placeholder:text-text-soft hover:border-brand-300 focus-within:border-brand-300 focus-within:ring-3 focus-within:ring-brand-500/10";

type DrawerSectionProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

function DrawerSection({ icon, title, children }: DrawerSectionProps) {
  return (
    <section className="border-border bg-surface-elevated shadow-theme-sm rounded-2xl border p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300 flex h-10 w-10 items-center justify-center rounded-xl">
          {icon}
        </div>
        <div>
          <h3 className="text-text-strong text-sm font-semibold">{title}</h3>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function JobBoardFilterDrawer() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<FilterFormValues>();

  const drawerWidth = useMemo(() => {
    if (typeof window === "undefined") {
      return 440;
    }

    if (window.innerWidth >= 1536) return 500;
    if (window.innerWidth >= 1280) return 460;
    if (window.innerWidth >= 1024) return 430;
    if (window.innerWidth >= 768) return 400;
    if (window.innerWidth >= 640) return "88vw";
    return "100vw";
  }, []);

  const onClose = () => setOpen(false);

  const onFinish = (values: FilterFormValues) => {
    console.log("Applied filters:", values);
    setOpen(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Button
        icon={<FiSliders />}
        size="large"
        onClick={() => setOpen(true)}
        className="border-border bg-surface-elevated text-text-strong shadow-theme-xs hover:!border-brand-300 hover:!bg-brand-50/60 h-11 rounded-lg px-4 text-sm font-medium"
      >
        Filters
      </Button>

      <Drawer
        open={open}
        onClose={onClose}
        placement="right"
        width={drawerWidth}
        destroyOnHidden
        title={null}
        styles={{ body: drawerBodyStyles }}
      >
        <div className="flex h-full flex-col">
          <div className="border-border bg-surface-elevated border-b px-5 py-4 sm:px-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300 flex h-11 w-11 items-center justify-center rounded-xl">
                  <FilterOutlined style={{ fontSize: 18 }} />
                </div>
                <div>
                  <p className="text-text-muted text-xs font-semibold tracking-[0.14em] uppercase">
                    Job board filters
                  </p>
                  <h2 className="text-text-strong mt-1 text-lg font-semibold">
                    Refine tuition jobs
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              requiredMark={false}
              size="large"
              className="space-y-4"
            >
              <DrawerSection
                icon={<CalendarOutlined style={{ fontSize: 18 }} />}
                title="Posted date"
              >
                <Row gutter={[12, 12]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Posted date from"
                      name="postedDateFrom"
                      className={formItemClassName}
                    >
                      <DatePicker
                        className={`w-full ${controlClassName}`}
                        format="DD MMM YYYY"
                        placeholder="Select start date"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Posted date to"
                      name="postedDateTo"
                      className={formItemClassName}
                    >
                      <DatePicker
                        className={`w-full ${controlClassName}`}
                        format="DD MMM YYYY"
                        placeholder="Select end date"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </DrawerSection>

              <DrawerSection
                icon={<EnvironmentOutlined style={{ fontSize: 18 }} />}
                title="Location"
              >
                <Row gutter={[12, 12]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Country"
                      name="country"
                      className={formItemClassName}
                    >
                      <Select
                        allowClear
                        showSearch
                        placeholder="Select country"
                        options={countryOptions}
                        optionFilterProp="label"
                        className={controlClassName}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="City"
                      name="city"
                      className={formItemClassName}
                    >
                      <Input
                        placeholder="Enter city"
                        className={controlClassName}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      label="Area / location"
                      name="areaLocation"
                      className={formItemClassName}
                    >
                      <Input
                        placeholder="Enter area or specific location"
                        className={controlClassName}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </DrawerSection>

              <DrawerSection
                icon={<BookOutlined style={{ fontSize: 18 }} />}
                title="Academic details"
              >
                <Row gutter={[12, 12]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Select category"
                      name="category"
                      className={formItemClassName}
                    >
                      <Select
                        allowClear
                        placeholder="Choose category"
                        options={categoryOptions}
                        optionFilterProp="label"
                        className={controlClassName}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Courses / class"
                      name="courseClass"
                      className={formItemClassName}
                    >
                      <Input
                        placeholder="e.g. Class 8, HSC, IELTS"
                        className={controlClassName}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      label="Subject"
                      name="subject"
                      className={formItemClassName}
                    >
                      <Select
                        allowClear
                        showSearch
                        placeholder="Select subject"
                        options={subjectOptions}
                        optionFilterProp="label"
                        className={controlClassName}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </DrawerSection>
            </Form>
          </div>

          <div className="border-border bg-surface-elevated border-t px-4 py-4 sm:px-5">
            <Space size="middle" wrap className="flex w-full justify-end">
              <Button icon={<ReloadOutlined />} size="large" onClick={onReset}>
                Reset
              </Button>
              <Button size="large" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="primary"
                size="large"
                icon={<FilterOutlined />}
                onClick={() => form.submit()}
              >
                Apply Filters
              </Button>
            </Space>
          </div>
        </div>
      </Drawer>
    </>
  );
}
