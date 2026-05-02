import SchoolInfoSection from "./SchoolInfoSection";
import CollegeInfoSection from "./CollegeInfoSection";
import DiplomaInfoSection from "./DiplomaInfoSection";
import {
  GraduationInfoSection,
  PostGraduationInfoSection,
} from "./HigherEducationInfoSection";

import {
  type EducationValues,
} from "./educationTypes";
import type { EducationSectionKey } from "../profileAdapters";

type EducationInfoSectionProps = {
  values: EducationValues;
  onSave: <TKey extends EducationSectionKey>(
    key: TKey,
    values: EducationValues[TKey],
  ) => Promise<void> | void;
  onDiplomaToggle: (checked: boolean) => void;
  savingSection?: EducationSectionKey | null;
  saveErrors?: Partial<Record<EducationSectionKey, string>>;
  onClearSaveError?: (key: EducationSectionKey) => void;
};

export default function EducationInfoSection({
  values,
  onSave,
  onDiplomaToggle,
  savingSection = null,
  saveErrors = {},
  onClearSaveError,
}: EducationInfoSectionProps) {
  const isDiplomaStudent = Boolean(values.college.is_diploma_student);
  const clearSaveError = (key: EducationSectionKey) => {
    onClearSaveError?.(key);
  };

  return (
    <div className="space-y-6">
      <SchoolInfoSection
        values={values.school}
        onSave={(school) => onSave("school", school)}
        isSaving={savingSection === "school"}
        saveError={saveErrors.school}
        onClearSaveError={() => clearSaveError("school")}
      />

      {isDiplomaStudent ? (
        <DiplomaInfoSection
          values={values.diploma}
          isDiplomaStudent={isDiplomaStudent}
          onDiplomaToggle={onDiplomaToggle}
          onSave={(diploma) => onSave("diploma", diploma)}
          isSaving={savingSection === "diploma"}
          saveError={saveErrors.diploma}
          onClearSaveError={() => clearSaveError("diploma")}
        />
      ) : (
        <CollegeInfoSection
          values={values.college}
          isDiplomaStudent={isDiplomaStudent}
          onDiplomaToggle={onDiplomaToggle}
          onSave={(college) => onSave("college", college)}
          isSaving={savingSection === "college"}
          saveError={saveErrors.college}
          onClearSaveError={() => clearSaveError("college")}
        />
      )}

      <GraduationInfoSection
        values={values.graduation}
        onSave={(graduation) => onSave("graduation", graduation)}
        isSaving={savingSection === "graduation"}
        saveError={saveErrors.graduation}
        onClearSaveError={() => clearSaveError("graduation")}
      />

      <PostGraduationInfoSection
        values={values.post_graduation}
        onSave={(postGraduationValues) =>
          onSave("post_graduation", postGraduationValues)
        }
        isSaving={savingSection === "post_graduation"}
        saveError={saveErrors.post_graduation}
        onClearSaveError={() => clearSaveError("post_graduation")}
      />
    </div>
  );
}
