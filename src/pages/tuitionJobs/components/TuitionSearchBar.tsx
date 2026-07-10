import { useState } from "react";
import {
  BookOutlined,
  EnvironmentOutlined,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Form, Input, Select } from "antd";
import { FiSliders } from "react-icons/fi";
import { MdOutlineManageSearch } from "react-icons/md";


import {
  COUNTRY_OPTIONS,
  CATEGORY_OPTIONS,
  getCityOptions,
  getAreaOptions,
  getCourseOptions,
  getSubjectOptions,
} from "@/utils/formOptions.utils";

// --- Types ---
export type FilterQuery = {
  locationFilter?: {
    country?: string;
    city?: string;
    area?: string[];
  };
  educationFilter?: {
    categories?: string[];
    courses?: string[];
    subjects?: string[];
  };
};

// --- Constants ---
const INPUT_CLASSES =
  "border-border bg-surface-elevated text-text-strong shadow-theme-xs hover:border-brand-300 focus-within:border-brand-300 h-11 rounded-lg";

const LABEL_CLASSES =
  "[&_.ant-form-item-label>label]:text-text-muted [&_.ant-form-item-label>label]:text-xs [&_.ant-form-item-label>label]:font-semibold [&_.ant-form-item-label>label]:uppercase [&_.ant-form-item-label>label]:tracking-[0.12em]";

export default function TuitionSearchBar({
  onFilter,
  onSearch,
}: {
  onFilter: (query: FilterQuery) => void;
  onSearch: (search: string) => void;
}) {
  const [form] = Form.useForm();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Watch all form values to trigger re-renders for dependent dropdowns
  const values = Form.useWatch([], form);

  // Derive current selections for dependent logic
  const selectedCountry = values?.locationFilter?.country;
  const selectedCity = values?.locationFilter?.city;
  const selectedCategories = values?.educationFilter?.categories ?? [];
  const selectedCourses = values?.educationFilter?.courses ?? [];

  /**
   * Sanitizes and applies filters.
   * Removes empty/undefined strings before passing to parent.
   */
  const handleApplyFilters = (formValues: FilterQuery) => {
    const compact = (arr?: string[]) =>
      arr?.filter((v) => v?.trim().length > 0);

    onFilter({
      locationFilter: {
        country: formValues.locationFilter?.country,
        city: formValues.locationFilter?.city,
        area: compact(formValues.locationFilter?.area),
      },
      educationFilter: {
        categories: compact(formValues.educationFilter?.categories),
        courses: compact(formValues.educationFilter?.courses),
        subjects: compact(formValues.educationFilter?.subjects),
      },
    });
    setIsDrawerOpen(false);
  };

  return (
    <section className="border-border bg-surface-elevated/84 shadow-theme-lg rounded-2xl border p-3 backdrop-blur">
      {/* Search Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <Input
          size="large"
          prefix={<MdOutlineManageSearch className="text-text-soft text-lg" />}
          placeholder="Search by area, location, or address..."
          className="border-border bg-surface-elevated text-text-strong h-11 flex-1 rounded-xl shadow-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onPressEnter={() => onSearch?.(searchQuery.trim())}
        />
        <Button
          size="large"
          className="h-11 rounded-xl px-4"
          onClick={() => setIsDrawerOpen(true)}
        >
          <FiSliders /> Filters
        </Button>
        <Button
          type="primary"
          size="large"
          className="h-11 rounded-xl px-6"
          onClick={() => onSearch?.(searchQuery.trim())}
        >
          Search
        </Button>
      </div>

      {/* Filter Drawer */}
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        width={440}
        title="Refine tuition jobs"
        styles={{ body: { background: "var(--color-surface-muted)" } }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleApplyFilters}
          className="space-y-6"
        >
          {/* Location Section */}
          <section className="bg-surface-elevated border-border rounded-2xl border p-4 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <EnvironmentOutlined /> Location
            </h3>

            <Form.Item
              name={["locationFilter", "country"]}
              label="Country"
              className={LABEL_CLASSES}
            >
              <Select
                allowClear
                showSearch
                options={COUNTRY_OPTIONS}
                className={INPUT_CLASSES}
                // Clear city when country changes
                onChange={() =>
                  form.setFieldValue(["locationFilter", "city"], null)
                }
              />
            </Form.Item>

            <Form.Item
              name={["locationFilter", "city"]}
              label="City"
              className={LABEL_CLASSES}
            >
              <Select
                allowClear
                showSearch
                options={getCityOptions(selectedCountry)}
                disabled={!selectedCountry}
                className={INPUT_CLASSES}
                // Clear area when city changes
                onChange={() =>
                  form.setFieldValue(["locationFilter", "area"], [])
                }
              />
            </Form.Item>

            <Form.Item
              name={["locationFilter", "area"]}
              label="Area"
              className={LABEL_CLASSES}
            >
              <Select
                allowClear
                mode="multiple"
                options={getAreaOptions(selectedCity, selectedCountry)}
                disabled={!selectedCity}
                className={INPUT_CLASSES}
              />
            </Form.Item>
          </section>

          {/* Academic Section */}
          <section className="bg-surface-elevated border-border rounded-2xl border p-4 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <BookOutlined /> Academic Details
            </h3>

            <Form.Item
              name={["educationFilter", "categories"]}
              label="Category"
              className={LABEL_CLASSES}
            >
              <Select
                allowClear
                mode="multiple"
                options={CATEGORY_OPTIONS}
                className={INPUT_CLASSES}
                // Reset dependent courses when categories change
                onChange={() =>
                  form.setFieldValue(["educationFilter", "courses"], [])
                }
              />
            </Form.Item>

            <Form.Item
              name={["educationFilter", "courses"]}
              label="Courses"
              className={LABEL_CLASSES}
            >
              <Select
                allowClear
                mode="multiple"
                options={getCourseOptions(selectedCategories)}
                disabled={selectedCategories.length === 0}
                className={INPUT_CLASSES}
                // Reset dependent subjects when courses change
                onChange={() =>
                  form.setFieldValue(["educationFilter", "subjects"], [])
                }
              />
            </Form.Item>

            <Form.Item
              name={["educationFilter", "subjects"]}
              label="Subject"
              className={LABEL_CLASSES}
            >
              <Select
                allowClear
                mode="multiple"
                options={getSubjectOptions(selectedCategories, selectedCourses)}
                disabled={selectedCourses.length === 0}
                className={INPUT_CLASSES}
              />
            </Form.Item>
          </section>

          <div className="flex justify-end gap-2">
            <Button
              icon={<ReloadOutlined />}
              onClick={() => form.resetFields()}
            >
              Reset
            </Button>
            <Button
              type="primary"
              icon={<FilterOutlined />}
              onClick={() => form.submit()}
            >
              Apply Filters
            </Button>
          </div>
        </Form>
      </Drawer>
    </section>
  );
}
