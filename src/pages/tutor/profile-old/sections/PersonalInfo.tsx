import { useEffect, useState } from "react";
import { Checkbox, DatePicker, Form, Input, Select } from "antd";
import type { Rule } from "antd/es/form";
import dayjs, { type Dayjs } from "dayjs";

import ProfileEditableSection, {
  ProfileFormGrid,
  ProfileFormSection,
  type ProfileInfoField,
} from "../shared/ProfileEditableSection";
import { getDisplayValue } from "@/utils/display.utils";
import {
  idNumberRules,
  requiredRule,
  validateFullName,
} from "@/validations/form.validation";
import type {
  EditableSectionProps,
  PersonalInfoValues,
  TeacherBloodGroup,
  TeacherGender,
  TeacherIdentificationType,
  TeacherMaritalStatus,
} from "../profileModel";

export type PersonalInfoFormValues = Omit<
  PersonalInfoValues,
  "date_of_birth"
> & {
  date_of_birth: Dayjs | null;
};

const fullNameRules: Rule[] = [{ validator: validateFullName }];

const phoneRules: Rule[] = [
  {
    pattern: /^(\+8801|01)[3-9]\d{8}$/,
    message: "Enter a valid Bangladeshi phone number",
  },
];

const GENDER_OPTIONS: { label: string; value: TeacherGender }[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const MARITAL_STATUS_OPTIONS: {
  label: string;
  value: TeacherMaritalStatus;
}[] = [
  { label: "Unmarried", value: "unmarried" },
  { label: "Married", value: "married" },
];

const BLOOD_GROUP_OPTIONS: {
  label: TeacherBloodGroup;
  value: TeacherBloodGroup;
}[] = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];

const RELIGION_OPTIONS = [
  { label: "Islam", value: "Islam" },
  { label: "Hinduism", value: "Hinduism" },
  { label: "Buddhism", value: "Buddhism" },
  { label: "Christianity", value: "Christianity" },
  { label: "Other", value: "Other" },
];

const ID_TYPE_OPTIONS: {
  label: string;
  value: TeacherIdentificationType;
}[] = [
  { label: "Passport", value: "passport" },
  { label: "NID", value: "nid" },
  { label: "Driving License", value: "driving_license" },
  { label: "Birth Certificate", value: "birth_certificate" },
];

const PERSONAL_INFO_ITEMS: ProfileInfoField<PersonalInfoValues>[] = [
  { key: "full_name", label: "Full Name" },
  { key: "phone", label: "Phone Number" },
  { key: "gender", label: "Gender" },
  { key: "marital_status", label: "Marital Status" },
  { key: "blood_group", label: "Blood Group" },
  { key: "date_of_birth", label: "Date of Birth" },
  { key: "religion", label: "Religion" },
  {
    key: "identification.type",
    label: "ID Type",
    getValue: (values) => values.identification.type,
  },
  {
    key: "identification.number",
    label: "ID Number",
    getValue: (values) => values.identification.number,
  },
  { key: "preset_address", label: "Present Address" },
  { key: "permanent_address", label: "Permanent Address" },
];

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const formatDateForDisplay = (value?: string) => {
  const trimmedValue = value?.trim();

  if (!trimmedValue) return "Not provided";

  const parsedDate = dayjs(trimmedValue);

  return !parsedDate.isValid()
    ? getDisplayValue(value)
    : dateFormatter.format(parsedDate.toDate());
};

const formatPersonalInfoValue = (key: string, value: unknown) => {
  if (key === "date_of_birth" && typeof value === "string") {
    return formatDateForDisplay(value);
  }

  if (key === "identification") {
    return "Configured";
  }

  return getDisplayValue(value);
};

const toPersonalInfoFormValues = (
  values: PersonalInfoValues,
): PersonalInfoFormValues => {
  const parsedDate = values.date_of_birth ? dayjs(values.date_of_birth) : null;

  return {
    ...values,
    date_of_birth: parsedDate?.isValid() ? parsedDate : null,
    identification: {
      type: values.identification.type,
      number: values.identification.number,
    },
  };
};

const fromPersonalInfoFormValues = (
  values: PersonalInfoFormValues,
): PersonalInfoValues => ({
  ...values,
  date_of_birth: values.date_of_birth?.format("YYYY-MM-DD") ?? "",
  identification: {
    type: values.identification.type,
    number: values.identification.number,
  },
});

function PersonalInfoForm() {
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
      </ProfileFormGrid>
    </ProfileFormSection>
  );
}

export default function PersonalInfoSection({
  values,
  onSave,
  onDelete,
  isSaving = false,
  saveError,
  onClearSaveError,
}: EditableSectionProps<PersonalInfoValues>) {
  return (
    <ProfileEditableSection<PersonalInfoValues, PersonalInfoFormValues>
      title="Personal Information"
      modalTitle="Edit Personal Information"
      modalDescription="Update your personal details and optional social profile links."
      values={values}
      items={PERSONAL_INFO_ITEMS}
      formatValue={formatPersonalInfoValue}
      toFormValues={toPersonalInfoFormValues}
      fromFormValues={fromPersonalInfoFormValues}
      onSave={onSave}
      onDelete={onDelete}
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
    >
      <PersonalInfoForm />
    </ProfileEditableSection>
  );
}
