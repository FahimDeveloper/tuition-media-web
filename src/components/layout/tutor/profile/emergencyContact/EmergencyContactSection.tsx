import ProfileEditableSection from "../shared/ProfileEditableSection";
import EmergencyContactForm from "./EmergencyContactForm";
import {
  EMERGENCY_CONTACT_ITEMS,
  formatEmergencyContactValue,
  type EmergencyContactValues,
} from "./EmergencyContactTypes";

type EmergencyContactSectionProps = {
  values: EmergencyContactValues;
  onSave: (values: EmergencyContactValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
};

export default function EmergencyContactSection({
  values,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
}: EmergencyContactSectionProps) {
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
