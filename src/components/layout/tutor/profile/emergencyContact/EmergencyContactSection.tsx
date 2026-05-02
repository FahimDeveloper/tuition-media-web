import { useState } from "react";

import ProfileEditableSection from "../shared/ProfileEditableSection";
import EmergencyContactForm from "./EmergencyContactForm";
import {
  EMERGENCY_CONTACT_ITEMS,
  INITIAL_EMERGENCY_CONTACT_VALUES,
  formatEmergencyContactValue,
  type EmergencyContactValues,
} from "./EmergencyContactTypes";

export default function EmergencyContactSection() {
  const [emergencyContactValues, setEmergencyContactValues] =
    useState<EmergencyContactValues>(INITIAL_EMERGENCY_CONTACT_VALUES);

  return (
    <ProfileEditableSection
      title="Emergency Contact"
      modalTitle="Edit Emergency Contact"
      modalDescription="Update your father, mother, and emergency contact information."
      values={emergencyContactValues}
      items={EMERGENCY_CONTACT_ITEMS}
      formatValue={(_, value) => formatEmergencyContactValue(value)}
      formClassName="[&_.ant-form-item]:mb-2"
      onSave={setEmergencyContactValues}
    >
      <EmergencyContactForm />
    </ProfileEditableSection>
  );
}
