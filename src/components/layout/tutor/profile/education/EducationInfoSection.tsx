import { useState } from "react";

import SchoolInfoSection from "./SchoolInfoSection";
import CollegeInfoSection from "./CollegeInfoSection";
import DiplomaInfoSection from "./DiplomaInfoSection";
import {
  GraduationInfoSection,
  PostGraduationInfoSection,
} from "./HigherEducationInfoSection";

import {
  INITIAL_COLLEGE_VALUES,
  INITIAL_DIPLOMA_VALUES,
  INITIAL_EDUCATION_VALUES,
  type EducationValues,
} from "./educationTypes";

export default function EducationInfoSection() {
  const [educationValues, setEducationValues] = useState<EducationValues>(
    INITIAL_EDUCATION_VALUES,
  );

  const isDiplomaStudent = educationValues.college.isDiplomaStudent;

  // Until RTK Query is wired, this keeps saved modal values in local state.
  // Later, each onSave callback can call the same mutation with its form payload.
  const updateEducationValues = <TKey extends keyof EducationValues>(
    key: TKey,
    values: EducationValues[TKey],
  ) => {
    setEducationValues((previous) => ({
      ...previous,
      [key]: values,
    }));
  };

  // The checkbox only chooses whether College or Diploma is visible.
  // It must not disable Graduation/Post Graduation or create a submission order.
  const handleDiplomaToggle = (checked: boolean) => {
    setEducationValues((previous) => ({
      ...previous,
      college: {
        ...INITIAL_COLLEGE_VALUES,
        isDiplomaStudent: checked,
      },
      diploma: INITIAL_DIPLOMA_VALUES,
    }));
  };

  return (
    <div className="space-y-6">
      <SchoolInfoSection
        values={educationValues.school}
        onSave={(school) => updateEducationValues("school", school)}
      />

      {isDiplomaStudent ? (
        <DiplomaInfoSection
          values={educationValues.diploma}
          isDiplomaStudent={isDiplomaStudent}
          onDiplomaToggle={handleDiplomaToggle}
          onSave={(diploma) => updateEducationValues("diploma", diploma)}
        />
      ) : (
        <CollegeInfoSection
          values={educationValues.college}
          isDiplomaStudent={isDiplomaStudent}
          onDiplomaToggle={handleDiplomaToggle}
          onSave={(college) => updateEducationValues("college", college)}
        />
      )}

      <GraduationInfoSection
        values={educationValues.graduation}
        onSave={(graduation) => updateEducationValues("graduation", graduation)}
      />

      <PostGraduationInfoSection
        values={educationValues.postGraduation}
        onSave={(postGraduation) =>
          updateEducationValues("postGraduation", postGraduation)
        }
      />
    </div>
  );
}
