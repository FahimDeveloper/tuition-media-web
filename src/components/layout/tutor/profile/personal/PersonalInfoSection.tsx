import ProfileEditableSection from "../shared/ProfileEditableSection";
import PersonalInfoForm from "./PersonalInfoForm";
import {
  PERSONAL_INFO_ITEMS,
  formatPersonalInfoValue,
  fromPersonalInfoFormValues,
  toPersonalInfoFormValues,
  type PersonalInfoFormValues,
  type PersonalInfoValues,
} from "./personalInfoTypes";

type PersonalInfoSectionProps = {
  values: PersonalInfoValues;
  onSave: (values: PersonalInfoValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
};

export default function PersonalInfoSection({
  values,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
}: PersonalInfoSectionProps) {
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
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
    >
      <PersonalInfoForm />
    </ProfileEditableSection>
  );
}
