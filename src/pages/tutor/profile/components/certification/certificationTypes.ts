import type { ProfileInfoField } from "../shared/ProfileInfoList";
import type { TeacherCertification } from "../teacherProfileTypes";

export type CertificationValues = {
  certifications: TeacherCertification[];
};

export const INITIAL_CERTIFICATION_VALUES: CertificationValues = {
  certifications: [],
};

export const CERTIFICATION_ITEMS: ProfileInfoField<CertificationValues>[] = [
  {
    key: "certifications",
    label: "Certifications",
    getValue: (values) =>
      values.certifications
        .map((certificate) => certificate.type)
        .filter(Boolean)
        .join(", "),
  },
];
