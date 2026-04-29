import {Checkbox} from 'antd';

import ProfileEditButton from '../shared/ProfileEditButton';
import ProfileEditableFormModal from '../shared/ProfileEditableFormModal';
import ProfileInfoList from '../shared/ProfileInfoList';
import ProfileSectionCard, {
  ProfileInfoGrid,
} from '../shared/ProfileSectionCard';
import useEditableProfileForm from '../shared/useEditableProfileForm';
import AcademicInstitutionFields from './AcademicInstitutionFields';
import {
  COLLEGE_INFO_ITEMS,
  formatEducationValue,
  prepareEducationPayload,
  type CollegeValues,
} from './educationTypes';

type CollegeFormValues = Omit<CollegeValues, 'isDiplomaStudent'>;

type CollegeInfoSectionProps = {
  values: CollegeValues;
  isDiplomaStudent: boolean;
  onDiplomaToggle: (checked: boolean) => void;
  onSave: (values: CollegeValues) => void;
};

export default function CollegeInfoSection({
  values,
  isDiplomaStudent,
  onDiplomaToggle,
  onSave,
}: CollegeInfoSectionProps) {
  const editableForm = useEditableProfileForm<CollegeValues, CollegeFormValues>({
    values,
    onSave,
    toFormValues: (collegeValues) => ({
      collegeName: collegeValues.collegeName,
      group: collegeValues.group,
      curriculum: collegeValues.curriculum,
      board: collegeValues.board,
      gpa: collegeValues.gpa,
      passingYear: collegeValues.passingYear,
      certificateImage: collegeValues.certificateImage,
      isRunningStudent: collegeValues.isRunningStudent,
    }),
    fromFormValues: (formValues) => ({
      ...prepareEducationPayload(formValues, 'gpa'),
      isDiplomaStudent,
    }),
  });

  return (
    <>
      <ProfileSectionCard
        title="College"
        action={
          <div className="flex flex-col gap-3 lg:items-end">
            <Checkbox
              checked={isDiplomaStudent}
              onChange={(event) => onDiplomaToggle(event.target.checked)}
            >
              I am a diploma student
            </Checkbox>

            <ProfileEditButton onClick={editableForm.openModal} />
          </div>
        }
      >
        <ProfileInfoGrid>
          <ProfileInfoList
            items={COLLEGE_INFO_ITEMS}
            values={values}
            formatValue={formatEducationValue}
          />
        </ProfileInfoGrid>
      </ProfileSectionCard>

      <ProfileEditableFormModal
        isOpen={editableForm.isOpen}
        onClose={editableForm.closeModal}
        title="Edit College Information"
        description="Update your college information."
        form={editableForm.form}
        initialValues={editableForm.formValues}
        onSubmit={editableForm.handleSubmit}
      >
        <AcademicInstitutionFields
          nameField="collegeName"
          nameLabel="College Name"
          namePlaceholder="Enter your college name"
        />
      </ProfileEditableFormModal>
    </>
  );
}
