import { Form, Input } from "antd";

import ProfileEditableSection, {
  ProfileFormGrid,
  ProfileFormSection,
  type ProfileInfoField,
} from "../shared/ProfileEditableSection";
import { getDisplayValue } from "@/utils/display.utils";
import { requiredRule } from "@/validations/form.validation";
import type { EmergencyContactValues } from "../profileModel";

const EMERGENCY_CONTACT_ITEMS: ProfileInfoField<EmergencyContactValues>[] = [
  { key: "father_name", label: "Father Name" },
  { key: "father_phone", label: "Father Phone Number" },
  { key: "mother_name", label: "Mother Name" },
  { key: "mother_phone", label: "Mother Phone Number" },
  { key: "emergency_contact_name", label: "Emergency Contact Name" },
  { key: "emergency_contact_phone", label: "Emergency Contact Phone" },
];

const formatEmergencyContactValue = (value: unknown) => {
  return getDisplayValue(value);
};

function EmergencyContactForm() {
  return (
    <ProfileFormSection title="Emergency Contact">
      <ProfileFormGrid className="gap-x-6 gap-y-7">
        <Form.Item
          label="Father Name"
          name="father_name"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter father name")}
        >
          <Input size="large" placeholder="Enter father name" />
        </Form.Item>

        <Form.Item
          label="Father Phone Number"
          name="father_phone"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter father phone number")}
        >
          <Input size="large" placeholder="Enter father phone number" />
        </Form.Item>

        <Form.Item
          label="Mother Name"
          name="mother_name"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter mother name")}
        >
          <Input size="large" placeholder="Enter mother name" />
        </Form.Item>

        <Form.Item
          label="Mother Phone Number"
          name="mother_phone"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter mother phone number")}
        >
          <Input size="large" placeholder="Enter mother phone number" />
        </Form.Item>

        <Form.Item
          label="Emergency Contact Name"
          name="emergency_contact_name"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter emergency contact name")}
        >
          <Input size="large" placeholder="Enter emergency contact name" />
        </Form.Item>

        <Form.Item
          label="Emergency Contact Phone"
          name="emergency_contact_phone"
          validateTrigger="onBlur"
          rules={requiredRule("Please enter emergency contact number")}
        >
          <Input size="large" placeholder="Enter emergency contact number" />
        </Form.Item>
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
}: {
  values: EmergencyContactValues;
  onSave: (values: EmergencyContactValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
}) {
  return (
    <ProfileEditableSection
      title="Emergency Contact"
      modalTitle="Edit Emergency Contact"
      modalDescription="Update your father, mother, and emergency contact information."
      values={values}
      items={EMERGENCY_CONTACT_ITEMS}
      formatValue={(_, value) => formatEmergencyContactValue(value)}
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
