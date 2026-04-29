import DegreeInfoSection from './DegreeInfoSection';
import {
  GRADUATION_INFO_ITEMS,
  type GraduationValues,
} from './educationTypes';

type GraduationInfoSectionProps = {
  values: GraduationValues;
  onSave: (values: GraduationValues) => void;
};

export default function GraduationInfoSection({
  values,
  onSave,
}: GraduationInfoSectionProps) {
  return (
    <DegreeInfoSection
      title="Graduation"
      modalTitle="Edit Graduation Information"
      modalDescription="Update your graduation information."
      values={values}
      infoItems={GRADUATION_INFO_ITEMS}
      includeCurrentYear
      onSave={onSave}
    />
  );
}
