import {useState} from 'react';

import ProfileEditableSection from '../shared/ProfileEditableSection';
import PersonalInfoForm from './PersonalInfoForm';
import {
  INITIAL_PERSONAL_INFO_VALUES,
  PERSONAL_INFO_ITEMS,
  formatPersonalInfoValue,
  fromPersonalInfoFormValues,
  toPersonalInfoFormValues,
  type PersonalInfoFormValues,
  type PersonalInfoValues,
} from './personalInfoTypes';

export default function PersonalInfoSection() {
  const [profileValues, setProfileValues] = useState<PersonalInfoValues>(
    INITIAL_PERSONAL_INFO_VALUES,
  );

  return (
    <ProfileEditableSection<PersonalInfoValues, PersonalInfoFormValues>
      title="Personal Information"
      modalTitle="Edit Personal Information"
      modalDescription="Update your personal details and optional social profile links."
      values={profileValues}
      items={PERSONAL_INFO_ITEMS}
      formatValue={formatPersonalInfoValue}
      toFormValues={toPersonalInfoFormValues}
      fromFormValues={fromPersonalInfoFormValues}
      onSave={setProfileValues}
    >
      <PersonalInfoForm />
    </ProfileEditableSection>
  );
}
