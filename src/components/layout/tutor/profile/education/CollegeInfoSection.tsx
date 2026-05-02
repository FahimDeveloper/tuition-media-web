import { Checkbox } from "antd";

import ProfileEditableSection from "../shared/ProfileEditableSection";
import { AcademicInstitutionFields } from "./EducationFormFields";
import {
  COLLEGE_INFO_ITEMS,
  formatEducationValue,
  prepareEducationPayload,
  type CollegeValues,
} from "./educationTypes";

type CollegeFormValues = Omit<CollegeValues, "is_diploma_student">;

type CollegeInfoSectionProps = {
  values: CollegeValues;
  isDiplomaStudent: boolean;
  onDiplomaToggle: (checked: boolean) => void;
  onSave: (values: CollegeValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
};

export default function CollegeInfoSection({
  values,
  isDiplomaStudent,
  onDiplomaToggle,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
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
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
      toFormValues={(collegeValues) => ({
        name: collegeValues.name,
        group: collegeValues.group,
        curriculum: collegeValues.curriculum,
        board: collegeValues.board,
        gpa: collegeValues.gpa,
        year_of_passing: collegeValues.year_of_passing,
        status: collegeValues.status,
      })}
      fromFormValues={(formValues) => ({
        ...prepareEducationPayload(formValues),
        is_diploma_student: isDiplomaStudent,
      })}
      renderAction={({ defaultAction }) => (
        <div className="flex flex-col gap-3 lg:items-end">
          <Checkbox
            checked={isDiplomaStudent}
            disabled={isSaving}
            onChange={(event) => onDiplomaToggle(event.target.checked)}
          >
            I am a diploma student
          </Checkbox>

          {defaultAction}
        </div>
      )}
    >
      <AcademicInstitutionFields
        nameLabel="College Name"
        namePlaceholder="Enter your college name"
        includeStatus
      />
    </ProfileEditableSection>
  );
}
