import { Form, Input, InputNumber, Select } from "antd";

import {
  ProfileFormGrid,
  ProfileFormSection,
} from "../shared/ProfileFormLayout";
import { arrayRequiredRule, requiredRule } from "../profileUtils";
import {
  AVAILABLE_DAY_OPTIONS,
  TEACHING_METHOD_OPTIONS,
  type TuitionPreferenceValues,
} from "./tuitionPreferenceTypes";

export default function TuitionPreferenceForm() {
  const form = Form.useFormInstance<TuitionPreferenceValues>();

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
          validateTrigger="onBlur"
          rules={[
            ...requiredRule("Please enter your tuition country"),
            { min: 3, message: "Country must be at least 3 characters" },
          ]}
        >
          <Input size="large" placeholder="Enter tuition country" />
        </Form.Item>

        <Form.Item
          label="Tuition City"
          name={["preferred_teaching_locations", "city"]}
          validateTrigger="onBlur"
          rules={[
            ...requiredRule("Please enter your tuition city"),
            { min: 2, message: "City must be at least 2 characters" },
          ]}
        >
          <Input size="large" placeholder="Enter tuition city" />
        </Form.Item>

        <Form.Item
          label="Preferred Tuition Locations"
          name={["preferred_teaching_locations", "area"]}
          rules={arrayRequiredRule(
            "Please add at least one preferred tuition location",
          )}
        >
          <Select
            size="large"
            mode="tags"
            placeholder="Example: Dhanmondi, Mirpur, Uttara"
            tokenSeparators={[","]}
          />
        </Form.Item>

        <Form.Item
          label="Preferred Tutoring Categories"
          name={["preferred_tutoring", "categories"]}
          rules={arrayRequiredRule("Please add at least one tutoring category")}
        >
          <Select
            size="large"
            mode="tags"
            placeholder="Example: Bangla Medium, English Medium"
            tokenSeparators={[","]}
          />
        </Form.Item>

        <Form.Item
          label="Favorite Subjects"
          name={["preferred_tutoring", "subjects"]}
          rules={arrayRequiredRule("Please add at least one subject")}
        >
          <Select
            size="large"
            mode="tags"
            placeholder="Math, Physics, English"
            tokenSeparators={[","]}
          />
        </Form.Item>

        <Form.Item
          label="Preferred Classes"
          name={["preferred_tutoring", "courses"]}
          rules={arrayRequiredRule("Please add at least one class")}
        >
          <Select
            size="large"
            mode="tags"
            placeholder="Class 6, HSC, IELTS"
            tokenSeparators={[","]}
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
