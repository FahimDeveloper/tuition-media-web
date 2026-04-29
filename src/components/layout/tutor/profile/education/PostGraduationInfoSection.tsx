import DegreeInfoSection from './DegreeInfoSection';
import {
  POST_GRADUATION_INFO_ITEMS,
  type PostGraduationValues,
} from './educationTypes';

type PostGraduationInfoSectionProps = {
  values: PostGraduationValues;
  onSave: (values: PostGraduationValues) => void;
};

export default function PostGraduationInfoSection({
  values,
  onSave,
}: PostGraduationInfoSectionProps) {
  return (
    <DegreeInfoSection
      title="Post Graduation"
      modalTitle="Edit Post Graduation Information"
      modalDescription="Update your post graduation information."
      values={values}
      infoItems={POST_GRADUATION_INFO_ITEMS}
      onSave={onSave}
    />
  );
}
