import dayjs, {type Dayjs} from 'dayjs';
import type {Rule} from 'antd/es/form';
import {validateFullName} from '@/utils/formValidators';
import {getDisplayValue} from './profileUtils';

export type Gender = 'Male' | 'Female' | 'Other';
export type BloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';
export type Religion =
  | 'Islam'
  | 'Hinduism'
  | 'Buddhism'
  | 'Christianity'
  | 'Other';

type IdType = 'NID' | 'birthCertificate' | undefined;

export type PersonalInfoValues = {
  fullName: string;
  gender?: Gender;
  bloodGroup?: BloodGroup;
  nationality: string;
  dateOfBirth: string;
  idType: IdType;
  idNumber: string;
  idImage: string;
  bio?: string;
  religion?: Religion;
  phoneNumber: string;
  additionalPhoneNumber?: string;
  presentAddress: string;
  permanentAddress: string;
  facebook?: string;
  instagram?: string;
};

export type PersonalInfoFormValues = Omit<PersonalInfoValues, 'dateOfBirth'> & {
  dateOfBirth: Dayjs | null;
};

export type PersonalInfoFieldConfig<
  T extends keyof PersonalInfoValues = keyof PersonalInfoValues,
> = {
  key: T;
  label: string;
  placeholder?: string;
};

export const fullNameRules: Rule[] = [{validator: validateFullName}];

export const phoneRules: Rule[] = [
  {
    pattern: /^(\+8801|01)[3-9]\d{8}$/,
    message: 'Enter a valid Bangladeshi phone number',
  },
];

export const optionalUrlRules: Rule[] = [
  {
    type: 'url',
    message: 'Enter a valid URL',
  },
];

export const idNumberRules: Rule[] = [
  {
    pattern: /^\d{10}$|^\d{13}$|^\d{17}$/,
    message: 'Number must be 10, 13, or 17 digits',
  },
];

export const GENDER_OPTIONS: {label: Gender; value: Gender}[] = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
  {label: 'Other', value: 'Other'},
];

export const BLOOD_GROUP_OPTIONS: {label: BloodGroup; value: BloodGroup}[] = [
  {label: 'A+', value: 'A+'},
  {label: 'A-', value: 'A-'},
  {label: 'B+', value: 'B+'},
  {label: 'B-', value: 'B-'},
  {label: 'AB+', value: 'AB+'},
  {label: 'AB-', value: 'AB-'},
  {label: 'O+', value: 'O+'},
  {label: 'O-', value: 'O-'},
];

export const RELIGION_OPTIONS: {label: Religion; value: Religion}[] = [
  {label: 'Islam', value: 'Islam'},
  {label: 'Hinduism', value: 'Hinduism'},
  {label: 'Buddhism', value: 'Buddhism'},
  {label: 'Christianity', value: 'Christianity'},
  {label: 'Other', value: 'Other'},
];

// Empty Select values should be undefined, not ''.
// This allows Ant Design Select placeholder text to show correctly.
export const INITIAL_PERSONAL_INFO_VALUES: PersonalInfoValues = {
  fullName: 'Shakibul Islam',
  gender: undefined,
  bloodGroup: undefined,
  nationality: 'Bangladesh',
  dateOfBirth: '',
  idType: undefined,
  idNumber: '',
  idImage: '',
  religion: undefined,
  phoneNumber: '',
  additionalPhoneNumber: '',
  presentAddress: '',
  permanentAddress: '',
  facebook: '',
  instagram: '',
};

export const PERSONAL_INFO_ITEMS: PersonalInfoFieldConfig[] = [
  {key: 'fullName', label: 'Full Name'},
  {key: 'gender', label: 'Gender'},
  {key: 'bloodGroup', label: 'Blood Group'},
  {key: 'nationality', label: 'Nationality'},
  {key: 'dateOfBirth', label: 'Date of Birth'},
  {key: 'idType', label: 'ID Type'},
  {key: 'idNumber', label: 'ID Number'},
  {key: 'idImage', label: 'ID Image'},
  {key: 'religion', label: 'Religion'},
  {key: 'phoneNumber', label: 'Phone Number'},
  {key: 'additionalPhoneNumber', label: 'Additional Phone Number'},
  {key: 'presentAddress', label: 'Present Address'},
  {key: 'permanentAddress', label: 'Permanent Address'},
];

export const SOCIAL_LINK_FIELDS: PersonalInfoFieldConfig<
  'facebook' | 'instagram'
>[] = [
  {
    key: 'facebook',
    label: 'Facebook',
    placeholder: 'https://www.facebook.com/yourprofile',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    placeholder: 'https://www.instagram.com/yourprofile',
  },
];

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export const formatDateForDisplay = (value?: string) => {
  const trimmedValue = value?.trim();

  if (!trimmedValue) return 'Not provided';

  const parsedDate = new Date(`${trimmedValue}T00:00:00`);

  return Number.isNaN(parsedDate.getTime())
    ? getDisplayValue(value)
    : dateFormatter.format(parsedDate);
};

export const formatPersonalInfoValue = (
  key: keyof PersonalInfoValues,
  value: PersonalInfoValues[keyof PersonalInfoValues],
) => {
  if (key === 'dateOfBirth') {
    return formatDateForDisplay(value);
  }

  return getDisplayValue(value);
};

export const toPersonalInfoFormValues = (
  values: PersonalInfoValues,
): PersonalInfoFormValues => {
  const parsedDate = values.dateOfBirth ? dayjs(values.dateOfBirth) : null;

  return {
    ...values,
    dateOfBirth: parsedDate?.isValid() ? parsedDate : null,
  };
};

export const fromPersonalInfoFormValues = (
  values: PersonalInfoFormValues,
): PersonalInfoValues => ({
  ...values,
  dateOfBirth: values.dateOfBirth?.format('YYYY-MM-DD') ?? '',
});
