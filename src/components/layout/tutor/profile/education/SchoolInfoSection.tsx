import ProfileEditableSection from "../shared/ProfileEditableSection";
import { AcademicInstitutionFields } from "./EducationFormFields";
import {
  SCHOOL_INFO_ITEMS,
  formatEducationValue,
  prepareEducationPayload,
  type SchoolValues,
} from "./educationTypes";

type SchoolInfoSectionProps = {
  values: SchoolValues;
  onSave: (values: SchoolValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
};

export default function SchoolInfoSection({
  values,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
}: SchoolInfoSectionProps) {
  return (
    <ProfileEditableSection
      title="School"
      modalTitle="Edit School Information"
      modalDescription="Update your school information."
      values={values}
      items={SCHOOL_INFO_ITEMS}
      formatValue={formatEducationValue}
      onSave={onSave}
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
      fromFormValues={prepareEducationPayload}
    >
      <AcademicInstitutionFields
        nameLabel="School Name"
        namePlaceholder="Enter your school name"
      />
    </ProfileEditableSection>
  );
}
