import dayjs, { type Dayjs } from "dayjs";
import type { Rule } from "antd/es/form";
import { validateFullName } from "@/utils/formValidators";
import { getDisplayValue } from "../profileUtils";
import type { ProfileInfoField } from "../shared/ProfileInfoList";
import type {
  TeacherBloodGroup,
  TeacherGender,
  TeacherIdentification,
  TeacherIdentificationType,
  TeacherMaritalStatus,
} from "../teacherProfileTypes";

export type PersonalInfoValues = {
  full_name: string;
  phone: string;
  preset_address?: string;
  permanent_address?: string;
  about_me?: string;
  gender?: TeacherGender;
  date_of_birth: string;
  blood_group?: TeacherBloodGroup;
  religion?: string;
  marital_status?: TeacherMaritalStatus;
  identification: TeacherIdentification;
};

export type PersonalInfoFormValues = Omit<
  PersonalInfoValues,
  "date_of_birth"
> & {
  date_of_birth: Dayjs | null;
};

export const fullNameRules: Rule[] = [{ validator: validateFullName }];

export const phoneRules: Rule[] = [
  {
    pattern: /^(\+8801|01)[3-9]\d{8}$/,
    message: "Enter a valid Bangladeshi phone number",
  },
];

export const optionalUrlRules: Rule[] = [
  {
    type: "url",
    message: "Enter a valid URL",
  },
];

export const idNumberRules: Rule[] = [
  {
    pattern: /^[A-Za-z0-9-]{6,32}$/,
    message: "Enter a valid identification number",
  },
];

export const GENDER_OPTIONS: { label: string; value: TeacherGender }[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export const MARITAL_STATUS_OPTIONS: {
  label: string;
  value: TeacherMaritalStatus;
}[] = [
  { label: "Unmarried", value: "unmarried" },
  { label: "Married", value: "married" },
];

export const BLOOD_GROUP_OPTIONS: {
  label: TeacherBloodGroup;
  value: TeacherBloodGroup;
}[] = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];

export const RELIGION_OPTIONS = [
  { label: "Islam", value: "Islam" },
  { label: "Hinduism", value: "Hinduism" },
  { label: "Buddhism", value: "Buddhism" },
  { label: "Christianity", value: "Christianity" },
  { label: "Other", value: "Other" },
];

export const ID_TYPE_OPTIONS: {
  label: string;
  value: TeacherIdentificationType;
}[] = [
  { label: "Passport", value: "passport" },
  { label: "NID", value: "nid" },
  { label: "Driving License", value: "driving_license" },
  { label: "Birth Certificate", value: "birth_certificate" },
];

export const INITIAL_PERSONAL_INFO_VALUES: PersonalInfoValues = {
  full_name: "Shakibul Islam",
  phone: "",
  preset_address: "",
  permanent_address: "",
  about_me: "",
  gender: undefined,
  date_of_birth: "",
  blood_group: undefined,
  religion: undefined,
  marital_status: undefined,
  identification: {
    type: undefined,
    number: "",
  },
};

export const PERSONAL_INFO_ITEMS: ProfileInfoField<PersonalInfoValues>[] = [
  { key: "full_name", label: "Full Name" },
  { key: "phone", label: "Phone Number" },
  { key: "gender", label: "Gender" },
  { key: "marital_status", label: "Marital Status" },
  { key: "blood_group", label: "Blood Group" },
  { key: "date_of_birth", label: "Date of Birth" },
  { key: "religion", label: "Religion" },
  {
    key: "identification.type",
    label: "ID Type",
    getValue: (values) => values.identification.type,
  },
  {
    key: "identification.number",
    label: "ID Number",
    getValue: (values) => values.identification.number,
  },
  { key: "preset_address", label: "Present Address" },
  { key: "permanent_address", label: "Permanent Address" },
  { key: "about_me", label: "About Me" },
];

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const formatDateForDisplay = (value?: string) => {
  const trimmedValue = value?.trim();

  if (!trimmedValue) return "Not provided";

  const parsedDate = new Date(`${trimmedValue}T00:00:00`);

  return Number.isNaN(parsedDate.getTime())
    ? getDisplayValue(value)
    : dateFormatter.format(parsedDate);
};

export const formatPersonalInfoValue = (
  key: keyof PersonalInfoValues,
  value: PersonalInfoValues[keyof PersonalInfoValues] | unknown,
) => {
  if (key === "date_of_birth") {
    return formatDateForDisplay(value as string);
  }

  if (key === "identification") {
    return "Configured";
  }

  return getDisplayValue(value);
};

export const toPersonalInfoFormValues = (
  values: PersonalInfoValues,
): PersonalInfoFormValues => {
  const parsedDate = values.date_of_birth ? dayjs(values.date_of_birth) : null;

  return {
    ...values,
    date_of_birth: parsedDate?.isValid() ? parsedDate : null,
    identification: {
      type: values.identification.type,
      number: values.identification.number,
    },
  };
};

export const fromPersonalInfoFormValues = (
  values: PersonalInfoFormValues,
): PersonalInfoValues => ({
  ...values,
  date_of_birth: values.date_of_birth?.format("YYYY-MM-DD") ?? "",
  identification: {
    type: values.identification.type,
    number: values.identification.number,
  },
});
