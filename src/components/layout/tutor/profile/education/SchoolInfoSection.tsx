import { useState } from "react";

import ProfileEditableSection from "../shared/ProfileEditableSection";
import { AcademicInstitutionFields } from "./EducationFormFields";
import {
  INITIAL_SCHOOL_VALUES,
  SCHOOL_INFO_ITEMS,
  formatEducationValue,
  prepareEducationPayload,
  type SchoolValues,
} from "./educationTypes";

type SchoolInfoSectionProps = {
  values?: SchoolValues;
  onSave?: (values: SchoolValues) => void;
};

export default function SchoolInfoSection({
  values,
  onSave,
}: SchoolInfoSectionProps) {
  // Until RTK Query is wired, this keeps saved modal values in local state.
  // Later, each onSave callback can call the same mutation with its form payload.
  const [localValues, setLocalValues] = useState<SchoolValues>(
    INITIAL_SCHOOL_VALUES,
  );

  const schoolValues = values ?? localValues;

  return (
    <ProfileEditableSection
      title="School"
      modalTitle="Edit School Information"
      modalDescription="Update your school information."
      values={schoolValues}
      items={SCHOOL_INFO_ITEMS}
      formatValue={formatEducationValue}
      onSave={onSave ?? setLocalValues}
      fromFormValues={(formValues) =>
        prepareEducationPayload(formValues, "gpa")
      }
    >
      <AcademicInstitutionFields
        nameField="schoolName"
        nameLabel="School Name"
        namePlaceholder="Enter your school name"
      />
    </ProfileEditableSection>
  );
}
