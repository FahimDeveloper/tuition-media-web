import {Checkbox} from 'antd';

import ProfileEditableSection from '../shared/ProfileEditableSection';
import {AcademicInstitutionFields} from './EducationFormFields';
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
  onSave: (values: CollegeValues) => Promise<void> | void;
};

export default function CollegeInfoSection({
  values,
  isDiplomaStudent,
  onDiplomaToggle,
  onSave,
}: CollegeInfoSectionProps) {
  return (
    <ProfileEditableSection<CollegeValues, CollegeFormValues>
      title="College"
      modalTitle="Edit College Information"
      modalDescription="Update your college information."
      values={values}
      items={COLLEGE_INFO_ITEMS}
      formatValue={formatEducationValue}
      onSave={onSave}
      toFormValues={(collegeValues) => ({
        collegeName: collegeValues.collegeName,
        group: collegeValues.group,
        curriculum: collegeValues.curriculum,
        board: collegeValues.board,
        gpa: collegeValues.gpa,
        passingYear: collegeValues.passingYear,
        certificateImage: collegeValues.certificateImage,
        isRunningStudent: collegeValues.isRunningStudent,
      })}
      fromFormValues={(formValues) => ({
        ...prepareEducationPayload(formValues, 'gpa'),
        isDiplomaStudent,
      })}
      renderAction={({defaultAction}) => (
        <div className="flex flex-col gap-3 lg:items-end">
          <Checkbox
            checked={isDiplomaStudent}
            onChange={(event) => onDiplomaToggle(event.target.checked)}
          >
            I am a diploma student
          </Checkbox>

          {defaultAction}
        </div>
      )}
    >
      <AcademicInstitutionFields
        nameField="collegeName"
        nameLabel="College Name"
        namePlaceholder="Enter your college name"
      />
    </ProfileEditableSection>
  );
}
