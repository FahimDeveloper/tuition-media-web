import { Form, InputNumber, Select } from "antd";

import {
  ProfileFormGrid,
  ProfileFormSection,
} from "../shared/ProfileFormLayout";
import { arrayRequiredRule, requiredRule } from "../profileUtils";
import {
  AVAILABLE_DAY_OPTIONS,
  TEACHING_METHOD_OPTIONS,
  TUTORING_CATEGORY_OPTIONS,
  TUITION_CITY_OPTIONS,
  TUITION_COUNTRY_OPTIONS,
  areValidOptionValues,
  getTutoringCourseOptions,
  getTutoringSubjectOptions,
  getTuitionAreaOptions,
  type TuitionPreferenceValues,
} from "./tuitionPreferenceTypes";

export default function TuitionPreferenceForm() {
  const form = Form.useFormInstance<TuitionPreferenceValues>();
  const selectedCity = Form.useWatch(
    ["preferred_teaching_locations", "city"],
    form,
  );
  const selectedTutoringCategories =
    (Form.useWatch(["preferred_tutoring", "categories"], form) as
      | string[]
      | undefined) ?? [];
  const selectedTutoringCourses =
    (Form.useWatch(["preferred_tutoring", "courses"], form) as
      | string[]
      | undefined) ?? [];
  const tuitionAreaOptions = getTuitionAreaOptions(selectedCity);
  const tutoringCourseOptions = getTutoringCourseOptions(
    selectedTutoringCategories,
  );
  const tutoringSubjectOptions = getTutoringSubjectOptions(
    selectedTutoringCategories,
    selectedTutoringCourses,
  );

  const validateTuitionCountry = () => {
    const country = form.getFieldValue([
      "preferred_teaching_locations",
      "country",
    ]);

    if (
      !country ||
      TUITION_COUNTRY_OPTIONS.some((option) => option.value === country)
    ) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("Please select a valid tuition country"));
  };

  const validateTuitionCity = () => {
    const city = form.getFieldValue(["preferred_teaching_locations", "city"]);

    if (!city || TUITION_CITY_OPTIONS.some((option) => option.value === city)) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("Please select a valid tuition city"));
  };

  const validateTuitionAreas = () => {
    const areas =
      form.getFieldValue(["preferred_teaching_locations", "area"]) ?? [];
    const validAreas = new Set(
      getTuitionAreaOptions(
        form.getFieldValue(["preferred_teaching_locations", "city"]),
      ).map((option) => option.value),
    );

    if (
      areas.length === 0 ||
      areas.every((area: string) => validAreas.has(area))
    ) {
      return Promise.resolve();
    }

    return Promise.reject(
      new Error("Please select valid areas for the selected city"),
    );
  };

  const validateTutoringCategories = () => {
    const categories =
      form.getFieldValue(["preferred_tutoring", "categories"]) ?? [];

    if (areValidOptionValues(categories, TUTORING_CATEGORY_OPTIONS)) {
      return Promise.resolve();
    }

    return Promise.reject(
      new Error("Please select valid tutoring categories"),
    );
  };

  const validateTutoringCourses = () => {
    const categories =
      form.getFieldValue(["preferred_tutoring", "categories"]) ?? [];
    const courses = form.getFieldValue(["preferred_tutoring", "courses"]) ?? [];

    if (areValidOptionValues(courses, getTutoringCourseOptions(categories))) {
      return Promise.resolve();
    }

    return Promise.reject(
      new Error("Please select valid courses for the selected categories"),
    );
  };

  const validateTutoringSubjects = () => {
    const categories =
      form.getFieldValue(["preferred_tutoring", "categories"]) ?? [];
    const courses = form.getFieldValue(["preferred_tutoring", "courses"]) ?? [];
    const subjects =
      form.getFieldValue(["preferred_tutoring", "subjects"]) ?? [];

    if (
      areValidOptionValues(
        subjects,
        getTutoringSubjectOptions(categories, courses),
      )
    ) {
      return Promise.resolve();
    }

    return Promise.reject(
      new Error("Please select valid subjects for the selected courses"),
    );
  };

  const validateSalaryRange = () => {
    const min = form.getFieldValue([
      "preferred_tutoring",
      "salary_range",
      "min",
    ]);
    const max = form.getFieldValue([
      "preferred_tutoring",
      "salary_range",
      "max",
    ]);

    if (!min || !max || min <= max) {
      return Promise.resolve();
    }

    return Promise.reject(
      new Error("Minimum salary cannot be greater than maximum salary"),
    );
  };

  return (
    <ProfileFormSection title="Tuition Preference">
      <ProfileFormGrid className="gap-x-6 gap-y-7">
        <Form.Item
          label="Tuition Country"
          name={["preferred_teaching_locations", "country"]}
          rules={[
            ...requiredRule("Please select your tuition country"),
            { validator: validateTuitionCountry },
          ]}
        >
          <Select
            size="large"
            options={TUITION_COUNTRY_OPTIONS}
            placeholder="Select tuition country"
          />
        </Form.Item>

        <Form.Item
          label="Tuition City"
          name={["preferred_teaching_locations", "city"]}
          rules={[
            ...requiredRule("Please select your tuition city"),
            { validator: validateTuitionCity },
          ]}
        >
          <Select
            size="large"
            showSearch
            optionFilterProp="label"
            options={TUITION_CITY_OPTIONS}
            placeholder="Select tuition city"
            onChange={() =>
              form.setFieldValue(["preferred_teaching_locations", "area"], [])
            }
          />
        </Form.Item>

        <Form.Item
          label="Preferred Tuition Locations"
          name={["preferred_teaching_locations", "area"]}
          rules={[
            ...arrayRequiredRule(
              "Please select at least one preferred tuition location",
            ),
            { validator: validateTuitionAreas },
          ]}
        >
          <Select
            size="large"
            mode="multiple"
            optionFilterProp="label"
            options={tuitionAreaOptions}
            disabled={!selectedCity}
            placeholder={
              selectedCity ? "Select preferred areas" : "Select a city first"
            }
          />
        </Form.Item>

        <Form.Item
          label="Preferred Tutoring Categories"
          name={["preferred_tutoring", "categories"]}
          rules={[
            ...arrayRequiredRule("Please add at least one tutoring category"),
            { validator: validateTutoringCategories },
          ]}
        >
          <Select
            size="large"
            mode="multiple"
            showSearch
            optionFilterProp="label"
            options={TUTORING_CATEGORY_OPTIONS}
            placeholder="Select tutoring categories"
            onChange={() => {
              form.setFieldValue(["preferred_tutoring", "courses"], []);
              form.setFieldValue(["preferred_tutoring", "subjects"], []);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Preferred Courses / Classes"
          name={["preferred_tutoring", "courses"]}
          dependencies={[["preferred_tutoring", "categories"]]}
          rules={[
            ...arrayRequiredRule("Please add at least one class"),
            { validator: validateTutoringCourses },
          ]}
        >
          <Select
            size="large"
            mode="multiple"
            showSearch
            optionFilterProp="label"
            options={tutoringCourseOptions}
            disabled={selectedTutoringCategories.length === 0}
            placeholder={
              selectedTutoringCategories.length > 0
                ? "Select courses or classes"
                : "Select tutoring categories first"
            }
            onChange={() =>
              form.setFieldValue(["preferred_tutoring", "subjects"], [])
            }
          />
        </Form.Item>

        <Form.Item
          label="Favorite Subjects"
          name={["preferred_tutoring", "subjects"]}
          dependencies={[
            ["preferred_tutoring", "categories"],
            ["preferred_tutoring", "courses"],
          ]}
          rules={[
            ...arrayRequiredRule("Please add at least one subject"),
            { validator: validateTutoringSubjects },
          ]}
        >
          <Select
            size="large"
            mode="multiple"
            showSearch
            optionFilterProp="label"
            options={tutoringSubjectOptions}
            disabled={
              selectedTutoringCourses.length === 0 ||
              tutoringSubjectOptions.length === 0
            }
            placeholder={
              selectedTutoringCourses.length === 0
                ? "Select courses first"
                : "Select favorite subjects"
            }
          />
        </Form.Item>

        <Form.Item
          label="Tutoring Experience (Years)"
          name="years_of_experience"
          validateTrigger="onBlur"
          rules={[
            ...requiredRule("Please enter experience"),
            {
              type: "number",
              min: 0,
              message: "Experience cannot be negative",
            },
          ]}
        >
          <InputNumber
            size="large"
            min={0}
            className="w-full!"
            placeholder="e.g. 2"
          />
        </Form.Item>

        <Form.Item
          label="Available Days"
          name={["tutoring_availability", "days"]}
          rules={arrayRequiredRule("Please select at least one day")}
        >
          <Select
            size="large"
            mode="multiple"
            options={AVAILABLE_DAY_OPTIONS}
          />
        </Form.Item>

        <Form.Item
          label="Teaching Method"
          name={["preferred_tutoring", "tutoring_types"]}
          rules={arrayRequiredRule("Please select at least one method")}
        >
          <Select
            size="large"
            mode="multiple"
            options={TEACHING_METHOD_OPTIONS}
          />
        </Form.Item>

        <Form.Item
          label="Expected Salary Range"
          className="col-span-2"
          required
        >
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item
              name={["preferred_tutoring", "salary_range", "min"]}
              dependencies={[["preferred_tutoring", "salary_range", "max"]]}
              rules={[
                ...requiredRule("Please enter minimum expected salary"),
                { validator: validateSalaryRange },
              ]}
              className="w-full"
            >
              <InputNumber
                size="large"
                min={0}
                className="w-full!"
                placeholder="Minimum salary"
                addonBefore="à§³"
              />
            </Form.Item>

            <Form.Item
              name={["preferred_tutoring", "salary_range", "max"]}
              dependencies={[["preferred_tutoring", "salary_range", "min"]]}
              rules={[
                ...requiredRule("Please enter maximum expected salary"),
                { validator: validateSalaryRange },
              ]}
              className="w-full"
            >
              <InputNumber
                size="large"
                min={0}
                className="w-full!"
                placeholder="Maximum salary"
                addonBefore="à§³"
              />
            </Form.Item>
          </div>
        </Form.Item>
      </ProfileFormGrid>
    </ProfileFormSection>
  );
}
