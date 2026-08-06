import { Form, Input } from "antd";
import type { Rule } from "antd/es/form";

import ProfileEditableSection, {
  ProfileFormGrid,
  ProfileFormSection,
  type ProfileInfoField,
} from "../shared/ProfileEditableSection";
import { getDisplayValue } from "@/utils/display.utils";
import { requiredRule } from "@/validations/form.validation";
import type {
  EditableSectionProps,
  EmergencyContactValues,
} from "../profileModel";

type EmergencyContactField = {
  name: keyof EmergencyContactValues;
  label: string;
  placeholder: string;
  requiredMessage?: string;
  rules?: Rule[];
};

const phoneRules: Rule[] = [
  {
    pattern: /^(\+8801|01)[3-9]\d{8}$/,
    message: "Enter a valid Bangladeshi phone number",
  },
];

const EMERGENCY_CONTACT_FIELDS: EmergencyContactField[] = [
  {
    name: "father_name",
    label: "Father Name",
    placeholder: "Enter father name",
    requiredMessage: "Please enter father name",
  },
  {
    name: "father_phone",
    label: "Father Phone Number",
    placeholder: "Enter father phone number",
    requiredMessage: "Please enter father phone number",
    rules: phoneRules,
  },
  {
    name: "mother_name",
    label: "Mother Name",
    placeholder: "Enter mother name",
    requiredMessage: "Please enter mother name",
  },
  {
    name: "mother_phone",
    label: "Mother Phone Number",
    placeholder: "Enter mother phone number",
    requiredMessage: "Please enter mother phone number",
    rules: phoneRules,
  },
  {
    name: "emergency_contact_name",
    label: "Additional Contact Name",
    placeholder: "Enter additional contact name",
  },
  {
    name: "emergency_contact_phone",
    label: "Additional Contact Phone",
    placeholder: "Enter additional contact number",
    rules: phoneRules,
  },
];

const EMERGENCY_CONTACT_ITEMS: ProfileInfoField<EmergencyContactValues>[] =
  EMERGENCY_CONTACT_FIELDS.map(({ name, label }) => ({ key: name, label }));

const formatEmergencyContactValue = (_key: string, value: unknown) => {
  return getDisplayValue(value);
};

function EmergencyContactForm() {
  return (
    <ProfileFormSection title="Emergency Contact">
      <ProfileFormGrid className="gap-x-6 gap-y-7">
        {EMERGENCY_CONTACT_FIELDS.map(
          ({ name, label, placeholder, requiredMessage, rules = [] }) => (
            <Form.Item
              key={String(name)}
              label={label}
              name={name}
              validateTrigger="onBlur"
              rules={[
                ...(requiredMessage ? requiredRule(requiredMessage) : []),
                ...rules,
              ]}
            >
              <Input
                size="large"
                maxLength={60}
                inputMode={String(name).includes("phone") ? "tel" : undefined}
                autoComplete={
                  String(name).includes("phone") ? "tel" : undefined
                }
                placeholder={placeholder}
              />
            </Form.Item>
          ),
        )}
      </ProfileFormGrid>
    </ProfileFormSection>
  );
}

export default function EmergencyContactSection({
  values,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
}: EditableSectionProps<EmergencyContactValues>) {
  return (
    <ProfileEditableSection
      title="Emergency Contact"
      modalTitle="Edit Emergency Contact"
      modalDescription="Update required father and mother information. Additional contact is optional."
      values={values}
      items={EMERGENCY_CONTACT_ITEMS}
      formatValue={formatEmergencyContactValue}
      formClassName="[&_.ant-form-item]:mb-2"
      onSave={onSave}
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
    >
      <EmergencyContactForm />
    </ProfileEditableSection>
  );
}
