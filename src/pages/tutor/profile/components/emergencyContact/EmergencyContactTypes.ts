import { getDisplayValue } from "../profileUtils";
import type { ProfileInfoField } from "../shared/ProfileInfoList";
import type { TeacherParentsInfo } from "../teacherProfileTypes";

export type EmergencyContactValues = TeacherParentsInfo;

export const INITIAL_EMERGENCY_CONTACT_VALUES: EmergencyContactValues = {
  father_name: "",
  father_phone: "",
  mother_name: "",
  mother_phone: "",
  emergency_contact_name: "",
  emergency_contact_phone: "",
};

export const EMERGENCY_CONTACT_ITEMS: ProfileInfoField<EmergencyContactValues>[] =
  [
    { key: "father_name", label: "Father Name" },
    { key: "father_phone", label: "Father Phone Number" },
    { key: "mother_name", label: "Mother Name" },
    { key: "mother_phone", label: "Mother Phone Number" },
    { key: "emergency_contact_name", label: "Emergency Contact Name" },
    { key: "emergency_contact_phone", label: "Emergency Contact Phone" },
  ];

export const formatEmergencyContactValue = (value: unknown) => {
  return getDisplayValue(value);
};
