import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  BookOutlined,
  EnvironmentOutlined,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Col, Drawer, Form, Row, Select, Space } from "antd";
import { FiSliders } from "react-icons/fi";
import type { JobBoardFilterQuery } from "@/types";
import {
  TUTORING_CATEGORY_OPTIONS,
  TUITION_COUNTRY_OPTIONS,
  getTutoringCourseOptions,
  getTutoringSubjectOptions,
  getTuitionAreaOptions,
  getTuitionCityOptions,
} from "@/utils/tuition-options.utils";

type FilterFormValues = JobBoardFilterQuery;

type JobBoardFilterDrawerProps = {
  onApply?: (query: JobBoardFilterQuery) => void;
};

type DrawerSectionProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

const drawerBodyStyles = {
  padding: 0,
  background: "var(--color-surface-muted)",
  display: "flex",
  flexDirection: "column" as const,
  height: "100%",
};

const compactArray = (values?: string[]) =>
  values?.filter((value) => value.trim().length > 0);

const buildJobBoardFilterQuery = (
  values: FilterFormValues,
): JobBoardFilterQuery => {
  const location = values.preferred_teaching_locations;
  const tutoring = values.preferred_tutoring;
  const areas = compactArray(location?.area);
  const categories = compactArray(tutoring?.categories);
  const courses = compactArray(tutoring?.courses);
  const subjects = compactArray(tutoring?.subjects);

  return {
    ...(location?.country || location?.city || areas?.length
      ? {
          preferred_teaching_locations: {
            ...(location?.country ? { country: location.country } : {}),
            ...(location?.city ? { city: location.city } : {}),
            ...(areas?.length ? { area: areas } : {}),
          },
        }
      : {}),
    ...(categories?.length || courses?.length || subjects?.length
      ? {
          preferred_tutoring: {
            ...(categories?.length ? { categories } : {}),
            ...(courses?.length ? { courses } : {}),
            ...(subjects?.length ? { subjects } : {}),
          },
        }
      : {}),
  };
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

export default function JobBoardFilterDrawer({
  onApply,
}: JobBoardFilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<FilterFormValues>();
  const selectedCountry = Form.useWatch(
    ["preferred_teaching_locations", "country"],
    form,
  );
  const selectedCity = Form.useWatch(
    ["preferred_teaching_locations", "city"],
    form,
  );
  const selectedCategories =
    (Form.useWatch(["preferred_tutoring", "categories"], form) as
      | string[]
      | undefined) ?? [];
  const selectedCourses =
    (Form.useWatch(["preferred_tutoring", "courses"], form) as
      | string[]
      | undefined) ?? [];
  const cityOptions = getTuitionCityOptions(selectedCountry);
  const areaOptions = getTuitionAreaOptions(selectedCity, selectedCountry);
  const courseOptions = getTutoringCourseOptions(selectedCategories);
  const subjectOptions = getTutoringSubjectOptions(
    selectedCategories,
    selectedCourses,
  );

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
    const filterQuery = buildJobBoardFilterQuery(values);

    onApply?.(filterQuery);
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
        className="border-border bg-surface-elevated text-text-strong shadow-theme-xs hover:border-brand-300! hover:bg-brand-50/60! h-11 rounded-lg px-4 text-sm font-medium"
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
                icon={<EnvironmentOutlined style={{ fontSize: 18 }} />}
                title="Location"
              >
                <Row gutter={[12, 12]}>
                  <Col xs={24} sm={24}>
                    <Form.Item
                      label="Country"
                      name={["preferred_teaching_locations", "country"]}
                      className="[&_.ant-form-item-label>label]:text-text-muted [&_.ant-form-item-label>label]:text-xs [&_.ant-form-item-label>label]:font-semibold [&_.ant-form-item-label>label]:tracking-[0.12em] [&_.ant-form-item-label>label]:uppercase [&_.ant-form-item]:mb-0"
                    >
                      <Select
                        allowClear
                        showSearch
                        placeholder="Select country"
                        options={TUITION_COUNTRY_OPTIONS}
                        optionFilterProp="label"
                        className="border-border bg-surface-elevated text-text-strong shadow-theme-xs placeholder:text-text-soft hover:border-brand-300 focus-within:border-brand-300 focus-within:ring-brand-500/10 h-11 rounded-lg focus-within:ring-3"
                        onChange={() => {
                          form.setFieldValue(
                            ["preferred_teaching_locations", "city"],
                            undefined,
                          );
                          form.setFieldValue(
                            ["preferred_teaching_locations", "area"],
                            [],
                          );
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24}>
                    <Form.Item
                      label="City"
                      name={["preferred_teaching_locations", "city"]}
                      className="[&_.ant-form-item-label>label]:text-text-muted [&_.ant-form-item-label>label]:text-xs [&_.ant-form-item-label>label]:font-semibold [&_.ant-form-item-label>label]:tracking-[0.12em] [&_.ant-form-item-label>label]:uppercase [&_.ant-form-item]:mb-0"
                    >
                      <Select
                        allowClear
                        showSearch
                        placeholder={
                          selectedCountry
                            ? "Select city"
                            : "Select a country first"
                        }
                        options={cityOptions}
                        optionFilterProp="label"
                        disabled={!selectedCountry}
                        className="border-border bg-surface-elevated text-text-strong shadow-theme-xs placeholder:text-text-soft hover:border-brand-300 focus-within:border-brand-300 focus-within:ring-brand-500/10 h-11 rounded-lg focus-within:ring-3"
                        onChange={() =>
                          form.setFieldValue(
                            ["preferred_teaching_locations", "area"],
                            [],
                          )
                        }
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      label="Preferred tuition locations"
                      name={["preferred_teaching_locations", "area"]}
                      className="[&_.ant-form-item-label>label]:text-text-muted [&_.ant-form-item-label>label]:text-xs [&_.ant-form-item-label>label]:font-semibold [&_.ant-form-item-label>label]:tracking-[0.12em] [&_.ant-form-item-label>label]:uppercase [&_.ant-form-item]:mb-0"
                    >
                      <Select
                        allowClear
                        mode="multiple"
                        showSearch
                        placeholder={
                          selectedCity
                            ? "Select preferred areas"
                            : "Select a city first"
                        }
                        options={areaOptions}
                        optionFilterProp="label"
                        disabled={!selectedCity}
                        className="border-border bg-surface-elevated text-text-strong shadow-theme-xs placeholder:text-text-soft hover:border-brand-300 focus-within:border-brand-300 focus-within:ring-brand-500/10 min-h-11 rounded-lg focus-within:ring-3"
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
                  <Col xs={24} sm={24}>
                    <Form.Item
                      label="Select category"
                      name={["preferred_tutoring", "categories"]}
                      className="[&_.ant-form-item-label>label]:text-text-muted [&_.ant-form-item-label>label]:text-xs [&_.ant-form-item-label>label]:font-semibold [&_.ant-form-item-label>label]:tracking-[0.12em] [&_.ant-form-item-label>label]:uppercase [&_.ant-form-item]:mb-0"
                    >
                      <Select
                        allowClear
                        mode="multiple"
                        showSearch
                        placeholder="Choose category"
                        options={TUTORING_CATEGORY_OPTIONS}
                        optionFilterProp="label"
                        className="border-border bg-surface-elevated text-text-strong shadow-theme-xs placeholder:text-text-soft hover:border-brand-300 focus-within:border-brand-300 focus-within:ring-brand-500/10 min-h-11 rounded-lg focus-within:ring-3"
                        onChange={() => {
                          form.setFieldValue(
                            ["preferred_tutoring", "courses"],
                            [],
                          );
                          form.setFieldValue(
                            ["preferred_tutoring", "subjects"],
                            [],
                          );
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24}>
                    <Form.Item
                      label="Courses / class"
                      name={["preferred_tutoring", "courses"]}
                      className="[&_.ant-form-item-label>label]:text-text-muted [&_.ant-form-item-label>label]:text-xs [&_.ant-form-item-label>label]:font-semibold [&_.ant-form-item-label>label]:tracking-[0.12em] [&_.ant-form-item-label>label]:uppercase [&_.ant-form-item]:mb-0"
                    >
                      <Select
                        allowClear
                        mode="multiple"
                        showSearch
                        placeholder={
                          selectedCategories.length > 0
                            ? "Select courses or classes"
                            : "Select categories first"
                        }
                        options={courseOptions}
                        optionFilterProp="label"
                        disabled={selectedCategories.length === 0}
                        className="border-border bg-surface-elevated text-text-strong shadow-theme-xs placeholder:text-text-soft hover:border-brand-300 focus-within:border-brand-300 focus-within:ring-brand-500/10 min-h-11 rounded-lg focus-within:ring-3"
                        onChange={() =>
                          form.setFieldValue(
                            ["preferred_tutoring", "subjects"],
                            [],
                          )
                        }
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      label="Subject"
                      name={["preferred_tutoring", "subjects"]}
                      className="[&_.ant-form-item-label>label]:text-text-muted [&_.ant-form-item-label>label]:text-xs [&_.ant-form-item-label>label]:font-semibold [&_.ant-form-item-label>label]:tracking-[0.12em] [&_.ant-form-item-label>label]:uppercase [&_.ant-form-item]:mb-0"
                    >
                      <Select
                        allowClear
                        mode="multiple"
                        showSearch
                        placeholder={
                          selectedCourses.length > 0
                            ? "Select subjects"
                            : "Select courses first"
                        }
                        options={subjectOptions}
                        optionFilterProp="label"
                        disabled={
                          selectedCourses.length === 0 ||
                          subjectOptions.length === 0
                        }
                        className="border-border bg-surface-elevated text-text-strong shadow-theme-xs placeholder:text-text-soft hover:border-brand-300 focus-within:border-brand-300 focus-within:ring-brand-500/10 min-h-11 rounded-lg focus-within:ring-3"
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
