import {useMemo, useState} from 'react';

import CollegeInfoSection from './CollegeInfoSection';
import DegreeInfoSection from './DegreeInfoSection';
import DiplomaInfoSection from './DiplomaInfoSection';
import SchoolInfoSection from './SchoolInfoSection';
import {
  INITIAL_COLLEGE_VALUES,
  INITIAL_DIPLOMA_VALUES,
  INITIAL_EDUCATION_VALUES,
  type EducationValues,
} from './educationTypes';

export default function EducationInfoSection() {
  // Parent keeps all section values together.
  // Later you can replace this with API/Redux/Zustand.
  const [educationValues, setEducationValues] = useState<EducationValues>(
    INITIAL_EDUCATION_VALUES,
  );

  const isDiplomaStudent = educationValues.college.isDiplomaStudent;

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

  const disabledSections = useMemo(() => {
    const isCollegeOrDiplomaRunning = isDiplomaStudent
      ? educationValues.diploma.isRunningStudent
      : educationValues.college.isRunningStudent;

    return {
      collegeOrDiploma: educationValues.school.isRunningStudent,
      graduation:
        educationValues.school.isRunningStudent || isCollegeOrDiplomaRunning,
      postGraduation:
        educationValues.school.isRunningStudent ||
        isCollegeOrDiplomaRunning ||
        educationValues.graduation.isRunningStudent,
    };
  }, [educationValues, isDiplomaStudent]);

  return (
    <div className="space-y-6">
      <SchoolInfoSection
        values={educationValues.school}
        onSave={(school) =>
          setEducationValues((previous) => ({
            ...previous,
            school,
          }))
        }
      />

      {isDiplomaStudent ? (
        <DiplomaInfoSection
          values={educationValues.diploma}
          disabled={disabledSections.collegeOrDiploma}
          isDiplomaStudent={isDiplomaStudent}
          onDiplomaToggle={handleDiplomaToggle}
          onSave={(diploma) =>
            setEducationValues((previous) => ({
              ...previous,
              diploma,
            }))
          }
        />
      ) : (
        <CollegeInfoSection
          values={educationValues.college}
          disabled={disabledSections.collegeOrDiploma}
          isDiplomaStudent={isDiplomaStudent}
          onDiplomaToggle={handleDiplomaToggle}
          onSave={(college) =>
            setEducationValues((previous) => ({
              ...previous,
              college,
            }))
          }
        />
      )}

      <DegreeInfoSection
        title="Graduation"
        modalTitle="Edit Graduation Information"
        modalDescription="Update your graduation information."
        values={educationValues.graduation}
        disabled={disabledSections.graduation}
        onSave={(graduation) =>
          setEducationValues((previous) => ({
            ...previous,
            graduation,
          }))
        }
      />

      <DegreeInfoSection
        title="Post-Graduation"
        modalTitle="Edit Post-Graduation Information"
        modalDescription="Update your post-graduation information."
        values={educationValues.postGraduation}
        disabled={disabledSections.postGraduation}
        onSave={(postGraduation) =>
          setEducationValues((previous) => ({
            ...previous,
            postGraduation,
          }))
        }
      />
    </div>
  );
}
