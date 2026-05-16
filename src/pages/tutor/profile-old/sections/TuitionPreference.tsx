import { Form, InputNumber, Select } from "antd";

import ProfileEditableSection, {
  ProfileFormGrid,
  ProfileFormSection,
  type ProfileInfoField,
} from "../shared/ProfileEditableSection";
import {
  getDisplayValue,
  getSalaryDisplayValue,
  formatStringList,
} from "@/utils/display.utils";
import { arrayRequiredRule, requiredRule } from "@/validations/form.validation";
import {
  TUTORING_CATEGORY_OPTIONS,
  TUITION_COUNTRY_OPTIONS,
  TUITION_CITY_OPTIONS,
  areValidOptionValues,
  getTutoringCourseOptions,
  getTutoringSubjectOptions,
  getTuitionAreaOptions,
  getTuitionCityOptions,
} from "@/utils/tuition-options.utils";
import type { EditableSectionProps, TuitionPreferenceValues } from "../profileModel";

const TEACHING_METHOD_OPTIONS = [
  { label: "Home Tuition", value: "home_tuition" },
  { label: "Online Tuition", value: "online_tuition" },
  { label: "Group Tuition", value: "group_tuition" },
];

const AVAILABLE_DAY_OPTIONS = [
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
];

const TUITION_PREFERENCE_ITEMS: ProfileInfoField<TuitionPreferenceValues>[] = [
  {
    key: "preferred_teaching_locations.country",
    label: "Tuition Country",
    getValue: (values) => values.preferred_teaching_locations?.country,
  },
  {
    key: "preferred_teaching_locations.city",
    label: "Tuition City",
    getValue: (values) => values.preferred_teaching_locations?.city,
  },
  {
    key: "preferred_teaching_locations.area",
    label: "Preferred Tuition Locations",
    getValue: (values) => values.preferred_teaching_locations?.area,
  },
  {
    key: "preferred_tutoring.categories",
    label: "Preferred Tutoring Categories",
    getValue: (values) => values.preferred_tutoring?.categories,
  },
  {
    key: "preferred_tutoring.subjects",
    label: "Favorite Subjects for Tutoring",
    getValue: (values) => values.preferred_tutoring?.subjects,
  },
  {
    key: "preferred_tutoring.courses",
    label: "Preferred Courses / Classes",
    getValue: (values) => values.preferred_tutoring?.courses,
  },
  {
    key: "years_of_experience",
    label: "Tutoring Experience",
  },
  {
    key: "tutoring_availability.days",
    label: "Available Days",
    getValue: (values) => values.tutoring_availability?.days,
  },
  {
    key: "preferred_tutoring.tutoring_types",
    label: "Preferred Teaching Methods",
    getValue: (values) => values.preferred_tutoring?.tutoring_types,
  },
  {
    key: "preferred_tutoring.salary_range",
    label: "Expected Salary Range",
    getValue: (values) => values.preferred_tutoring?.salary_range,
  },
];

const formatTuitionPreferenceValue = (key: string, value: unknown) => {
  if (Array.isArray(value)) {
    return formatStringList(value);
  }

  if (String(key).includes("salary_range")) {
    return getSalaryDisplayValue(value);
  }

  return getDisplayValue(value);
};

const resolveValidation = (isValid: boolean, message: string) => {
  return isValid ? Promise.resolve() : Promise.reject(new Error(message));
};

function TuitionPreferenceForm() {
  const form = Form.useFormInstance<TuitionPreferenceValues>();
  const selectedCountry = Form.useWatch(
    ["preferred_teaching_locations", "country"],
    form,
  );
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
  const tuitionCityOptions = getTuitionCityOptions(selectedCountry);
  const tuitionAreaOptions = getTuitionAreaOptions(
    selectedCity,
    selectedCountry,
  );
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

    return resolveValidation(
      !country ||
        TUITION_COUNTRY_OPTIONS.some((option) => option.value === country),
      "Please select a valid tuition country",
    );
  };

  const validateTuitionCity = () => {
    const country = form.getFieldValue([
      "preferred_teaching_locations",
      "country",
    ]);
    const city = form.getFieldValue(["preferred_teaching_locations", "city"]);

    return resolveValidation(
      !city ||
        getTuitionCityOptions(country).some((option) => option.value === city),
      "Please select a valid tuition city",
    );
  };

  const validateTuitionAreas = () => {
    const areas =
      form.getFieldValue(["preferred_teaching_locations", "area"]) ?? [];
    const validAreas = new Set(
      getTuitionAreaOptions(
        form.getFieldValue(["preferred_teaching_locations", "city"]),
        form.getFieldValue(["preferred_teaching_locations", "country"]),
      ).map((option) => option.value),
    );

    return resolveValidation(
      areas.length === 0 ||
        areas.every((area: string) => validAreas.has(area)),
      "Please select valid areas for the selected city",
    );
  };

  const validateTutoringCategories = () => {
    const categories =
      form.getFieldValue(["preferred_tutoring", "categories"]) ?? [];

    return resolveValidation(
      areValidOptionValues(categories, TUTORING_CATEGORY_OPTIONS),
      "Please select valid tutoring categories",
    );
  };

  const validateTutoringCourses = () => {
    const categories =
      form.getFieldValue(["preferred_tutoring", "categories"]) ?? [];
    const courses = form.getFieldValue(["preferred_tutoring", "courses"]) ?? [];

    return resolveValidation(
      areValidOptionValues(courses, getTutoringCourseOptions(categories)),
      "Please select valid courses for the selected categories",
    );
  };

  const validateTutoringSubjects = () => {
    const categories =
      form.getFieldValue(["preferred_tutoring", "categories"]) ?? [];
    const courses = form.getFieldValue(["preferred_tutoring", "courses"]) ?? [];
    const subjects =
      form.getFieldValue(["preferred_tutoring", "subjects"]) ?? [];

    return resolveValidation(
      areValidOptionValues(
        subjects,
        getTutoringSubjectOptions(categories, courses),
      ),
      "Please select valid subjects for the selected courses",
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

    return resolveValidation(
      !min || !max || min <= max,
      "Minimum salary cannot be greater than maximum salary",
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
            onChange={() => {
              form.setFieldValue(["preferred_teaching_locations", "city"], "");
              form.setFieldValue(["preferred_teaching_locations", "area"], []);
            }}
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
            options={tuitionCityOptions}
            disabled={!selectedCountry}
            placeholder={
              selectedCountry ? "Select tuition city" : "Select a country first"
            }
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
                addonBefore={"\u09F3"}
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
                addonBefore={"\u09F3"}
              />
            </Form.Item>
          </div>
        </Form.Item>
      </ProfileFormGrid>
    </ProfileFormSection>
  );
}

export default function TuitionPreferenceSection({
  values,
  onSave,
  onDelete,
  isSaving = false,
  saveError,
  onClearSaveError,
}: EditableSectionProps<TuitionPreferenceValues>) {
  return (
    <ProfileEditableSection
      title="Tuition Preference"
      modalTitle="Edit Tuition Preference"
      modalDescription="Update your preferred tuition location, subjects, teaching method, availability, and salary expectation."
      values={values}
      items={TUITION_PREFERENCE_ITEMS}
      formatValue={formatTuitionPreferenceValue}
      formClassName="[&_.ant-form-item]:mb-2"
      onSave={onSave}
      onDelete={onDelete}
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
    >
      <TuitionPreferenceForm />
    </ProfileEditableSection>
  );
}
