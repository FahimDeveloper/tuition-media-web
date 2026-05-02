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
    const min = form.getFieldValue(["expectedSalaryRange", "min"]);
    const max = form.getFieldValue(["expectedSalaryRange", "max"]);

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
          name="tuitionCountry"
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
          name="tuitionCity"
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
          name="preferredTuitionLocations"
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
          name="preferredTutoringCategories"
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
          name="favoriteSubjects"
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
          name="preferredCoursesOrClasses"
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
          name="tutoringExperience"
          validateTrigger="onBlur"
          rules={[
            ...requiredRule("Please enter experience"),
            { min: 1, message: "Minimum 1 year required" },
          ]}
        >
          <Input type="number" size="large" placeholder="e.g. 2" />
        </Form.Item>

        <Form.Item
          label="Available Days"
          name="availableDays"
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
          name="preferredTeachingMethods"
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
              name={["expectedSalaryRange", "min"]}
              dependencies={[["expectedSalaryRange", "max"]]}
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
              name={["expectedSalaryRange", "max"]}
              dependencies={[["expectedSalaryRange", "min"]]}
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
