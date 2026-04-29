import {useState} from 'react';

import ProfileEditButton from '../shared/ProfileEditButton';
import ProfileEditableFormModal from '../shared/ProfileEditableFormModal';
import ProfileInfoList from '../shared/ProfileInfoList';
import ProfileSectionCard, {
  ProfileInfoGrid,
} from '../shared/ProfileSectionCard';
import useEditableProfileForm from '../shared/useEditableProfileForm';
import {AcademicInstitutionFields} from './EducationFormFields';
import {
  INITIAL_SCHOOL_VALUES,
  SCHOOL_INFO_ITEMS,
  formatEducationValue,
  prepareEducationPayload,
  type SchoolValues,
} from './educationTypes';

type SchoolInfoSectionProps = {
  values?: SchoolValues;
  onSave?: (values: SchoolValues) => void;
};

export default function SchoolInfoSection({
  values,
  onSave,
}: SchoolInfoSectionProps) {
  const [localValues, setLocalValues] = useState<SchoolValues>(
    values ?? INITIAL_SCHOOL_VALUES,
  );
  const schoolValues = values ?? localValues;
  const editableForm = useEditableProfileForm<SchoolValues>({
    values: schoolValues,
    onSave: onSave ?? setLocalValues,
    // This payload function can move directly into an RTK Query mutation call.
    fromFormValues: (formValues) => prepareEducationPayload(formValues, 'gpa'),
  });

  return (
    <>
      <ProfileSectionCard
        title="School"
        action={<ProfileEditButton onClick={editableForm.openModal} />}
      >
        <ProfileInfoGrid>
          <ProfileInfoList
            items={SCHOOL_INFO_ITEMS}
            values={schoolValues}
            formatValue={formatEducationValue}
          />
        </ProfileInfoGrid>
      </ProfileSectionCard>

      <ProfileEditableFormModal
        isOpen={editableForm.isOpen}
        onClose={editableForm.closeModal}
        title="Edit School Information"
        description="Update your school information."
        form={editableForm.form}
        initialValues={editableForm.formValues}
        onSubmit={editableForm.handleSubmit}
      >
        <AcademicInstitutionFields
          nameField="schoolName"
          nameLabel="School Name"
          namePlaceholder="Enter your school name"
        />
      </ProfileEditableFormModal>
    </>
  );
}
