import {useState} from 'react';

import CollegeInfoSection from './CollegeInfoSection';
import DiplomaInfoSection from './DiplomaInfoSection';
import GraduationInfoSection from './GraduationInfoSection';
import PostGraduationInfoSection from './PostGraduationInfoSection';
import SchoolInfoSection from './SchoolInfoSection';
import {
  INITIAL_COLLEGE_VALUES,
  INITIAL_DIPLOMA_VALUES,
  INITIAL_EDUCATION_VALUES,
  type EducationValues,
} from './educationTypes';

export default function EducationInfoSection() {
  const [educationValues, setEducationValues] = useState<EducationValues>(
    INITIAL_EDUCATION_VALUES,
  );

  const isDiplomaStudent = educationValues.college.isDiplomaStudent;

  const updateEducationValues = <TKey extends keyof EducationValues>(
    key: TKey,
    values: EducationValues[TKey],
  ) => {
    setEducationValues((previous) => ({
      ...previous,
      [key]: values,
    }));
  };

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
        onSave={(school) => updateEducationValues('school', school)}
      />

      {isDiplomaStudent ? (
        <DiplomaInfoSection
          values={educationValues.diploma}
          isDiplomaStudent={isDiplomaStudent}
          onDiplomaToggle={handleDiplomaToggle}
          onSave={(diploma) => updateEducationValues('diploma', diploma)}
        />
      ) : (
        <CollegeInfoSection
          values={educationValues.college}
          isDiplomaStudent={isDiplomaStudent}
          onDiplomaToggle={handleDiplomaToggle}
          onSave={(college) => updateEducationValues('college', college)}
        />
      )}

      <GraduationInfoSection
        values={educationValues.graduation}
        onSave={(graduation) =>
          updateEducationValues('graduation', graduation)
        }
      />

      <PostGraduationInfoSection
        values={educationValues.postGraduation}
        onSave={(postGraduation) =>
          updateEducationValues('postGraduation', postGraduation)
        }
      />
    </div>
  );
}
