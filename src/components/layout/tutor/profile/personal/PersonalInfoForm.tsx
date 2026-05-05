import { useEffect, useState } from "react";
import { Checkbox, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";

import {
  ProfileFormGrid,
  ProfileFormSection,
} from "../shared/ProfileFormLayout";
import { requiredRule } from "../profileUtils";
import {
  BLOOD_GROUP_OPTIONS,
  GENDER_OPTIONS,
  ID_TYPE_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  RELIGION_OPTIONS,
  fullNameRules,
  idNumberRules,
  phoneRules,
  type PersonalInfoFormValues,
} from "./personalInfoTypes";

export default function PersonalInfoForm() {
  const form = Form.useFormInstance<PersonalInfoFormValues>();
  const [isPermanentAddressSame, setIsPermanentAddressSame] = useState(false);
  const presentAddress = Form.useWatch("preset_address", form);

  useEffect(() => {
    if (!isPermanentAddressSame) return;

    form.setFieldValue("permanent_address", presentAddress || "");
  }, [form, isPermanentAddressSame, presentAddress]);

  const handlePermanentAddressSync = (checked: boolean) => {
    setIsPermanentAddressSame(checked);

    if (checked) {
      form.setFieldValue(
        "permanent_address",
        form.getFieldValue("preset_address") || "",
      );
    }
  };

  return (
    <>
      <ProfileFormSection title="Personal Information">
        <ProfileFormGrid className="gap-y-5">
          <Form.Item
            required
            label="Full Name"
            name="full_name"
            className="col-span-2 lg:col-span-1"
            validateTrigger="onBlur"
            rules={fullNameRules}
          >
            <Input size="large" placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            className="col-span-2 lg:col-span-1"
            validateTrigger="onBlur"
            rules={[
              ...requiredRule("Please enter your phone number"),
              ...phoneRules,
            ]}
          >
            <Input size="large" placeholder="Enter your primary phone number" />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            className="col-span-2 lg:col-span-1"
            rules={requiredRule("Please select your gender")}
          >
            <Select
              size="large"
              placeholder="Select gender"
              options={GENDER_OPTIONS}
            />
          </Form.Item>

          <Form.Item
            label="Marital Status"
            name="marital_status"
            className="col-span-2 lg:col-span-1"
          >
            <Select
              size="large"
              allowClear
              placeholder="Select marital status"
              options={MARITAL_STATUS_OPTIONS}
            />
          </Form.Item>

          <Form.Item
            label="Blood Group"
            name="blood_group"
            className="col-span-2 lg:col-span-1"
          >
            <Select
              size="large"
              allowClear
              placeholder="Select blood group"
              options={BLOOD_GROUP_OPTIONS}
            />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="date_of_birth"
            className="col-span-2 lg:col-span-1"
            rules={requiredRule("Please select your date of birth")}
          >
            <DatePicker
              size="large"
              className="w-full"
              format="DD MMM YYYY"
              placeholder="Select date of birth"
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
            />
          </Form.Item>

          <Form.Item
            label="Religion"
            name="religion"
            className="col-span-2 lg:col-span-1"
          >
            <Select
              size="large"
              allowClear
              placeholder="Select religion"
              options={RELIGION_OPTIONS}
            />
          </Form.Item>

          <div className="col-span-2">
            <Form.Item label="Identification" required>
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-[35%_1fr]">
                <Form.Item
                  name={["identification", "type"]}
                  className="mb-0"
                  rules={requiredRule("Select ID type")}
                >
                  <Select
                    size="large"
                    placeholder="Type"
                    options={ID_TYPE_OPTIONS}
                  />
                </Form.Item>

                <Form.Item
                  name={["identification", "number"]}
                  className="mb-0"
                  rules={[...idNumberRules, ...requiredRule("Enter ID number")]}
                >
                  <Input size="large" placeholder="Enter ID number" />
                </Form.Item>
              </div>
            </Form.Item>
          </div>

          <Form.Item
            label="Present Address"
            name="preset_address"
            className="col-span-2 lg:col-span-1"
            validateTrigger="onBlur"
            rules={[
              ...requiredRule("Please enter your present address"),
              { min: 5, message: "Address must be at least 5 characters" },
            ]}
          >
            <Input size="large" placeholder="Enter your present address" />
          </Form.Item>

          <Form.Item
            label="Permanent Address"
            name="permanent_address"
            className="col-span-2 lg:col-span-1"
            validateTrigger="onBlur"
            rules={[
              ...requiredRule("Please enter your permanent address"),
              { min: 5, message: "Address must be at least 5 characters" },
            ]}
          >
            <Input
              size="large"
              disabled={isPermanentAddressSame}
              placeholder="Enter your permanent address"
            />
          </Form.Item>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={isPermanentAddressSame}
              onChange={(event) =>
                handlePermanentAddressSync(event.target.checked)
              }
            >
              Same as present address
            </Checkbox>
          </div>

          <Form.Item
            label="About Me"
            name="about_me"
            className="col-span-2"
            rules={[
              { max: 300, message: "About me cannot exceed 300 characters" },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Write a short bio about yourself"
            />
          </Form.Item>
        </ProfileFormGrid>
      </ProfileFormSection>
    </>
  );
}
