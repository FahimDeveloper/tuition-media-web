import { useState } from "react";

import ProfileEditableSection from "../shared/ProfileEditableSection";
import TuitionPreferenceForm from "./TuitionPreferenceForm";
import {
  INITIAL_TUITION_PREFERENCE_VALUES,
  TUITION_PREFERENCE_ITEMS,
  formatTuitionPreferenceValue,
  type TuitionPreferenceValues,
} from "./tuitionPreferenceTypes";

export default function TuitionPreferenceSection() {
  const [tuitionPreferenceValues, setTuitionPreferenceValues] =
    useState<TuitionPreferenceValues>(INITIAL_TUITION_PREFERENCE_VALUES);

  return (
    <ProfileEditableSection
      title="Tuition Preference"
      modalTitle="Edit Tuition Preference"
      modalDescription="Update your preferred tuition location, subjects, teaching method, availability, and salary expectation."
      values={tuitionPreferenceValues}
      items={TUITION_PREFERENCE_ITEMS}
      formatValue={formatTuitionPreferenceValue}
      formClassName="[&_.ant-form-item]:mb-2"
      onSave={setTuitionPreferenceValues}
    >
      <TuitionPreferenceForm />
    </ProfileEditableSection>
  );
}
