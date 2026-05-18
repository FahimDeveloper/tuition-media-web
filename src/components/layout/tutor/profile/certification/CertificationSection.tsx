import ProfileEditableSection from "../shared/ProfileEditableSection";
import CertificationForm from "./CertificationForm";
import {
  CERTIFICATION_ITEMS,
  type CertificationValues,
} from "./certificationTypes";

type CertificationSectionProps = {
  values: CertificationValues;
  onSave: (values: CertificationValues) => Promise<void> | void;
  isSaving?: boolean;
  saveError?: string;
  onClearSaveError?: () => void;
};

export default function CertificationSection({
  values,
  onSave,
  isSaving = false,
  saveError,
  onClearSaveError,
}: CertificationSectionProps) {
  return (
    <ProfileEditableSection
      title="Certifications"
      modalTitle="Edit Certifications"
      modalDescription="Update professional certificates and document links."
      values={values}
      items={CERTIFICATION_ITEMS}
      onSave={onSave}
      isSaving={isSaving}
      saveError={saveError}
      onClearSaveError={onClearSaveError}
    >
      <CertificationForm />
    </ProfileEditableSection>
  );
}
