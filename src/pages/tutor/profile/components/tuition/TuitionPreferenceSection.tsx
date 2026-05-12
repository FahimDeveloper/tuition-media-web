import ProfileEditableSection from "../shared/ProfileEditableSection";
import TuitionPreferenceForm from "./TuitionPreferenceForm";
import {
  TUITION_PREFERENCE_ITEMS,
  formatTuitionPreferenceValue,
  type TuitionPreferenceValues,
} from "./tuitionPreferenceTypes";

type TuitionPreferenceSectionProps = {
  values: TuitionPreferenceValues;
  onSave: (values: TuitionPreferenceValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
};

export default function TuitionPreferenceSection({
  values,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
}: TuitionPreferenceSectionProps) {
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
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
    >
      <TuitionPreferenceForm />
    </ProfileEditableSection>
  );
}
