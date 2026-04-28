import {getDisplayValue} from '../profileUtils';

export type EmergencyContactValues = {
  fatherName: string;
  fatherPhoneNumber: string;
  motherName: string;
  motherPhoneNumber: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
};

export type EmergencyContactFieldConfig<
  T extends keyof EmergencyContactValues = keyof EmergencyContactValues,
> = {
  key: T;
  label: string;
};

export const INITIAL_EMERGENCY_CONTACT_VALUES: EmergencyContactValues = {
  fatherName: '',
  fatherPhoneNumber: '',
  motherName: '',
  motherPhoneNumber: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
};

export const EMERGENCY_CONTACT_ITEMS: EmergencyContactFieldConfig[] = [
  {key: 'fatherName', label: 'Father Name'},
  {key: 'fatherPhoneNumber', label: 'Father Phone Number'},
  {key: 'motherName', label: 'Mother Name'},
  {key: 'motherPhoneNumber', label: 'Mother Phone Number'},
  {key: 'emergencyContactName', label: 'Emergency Contact Name'},
  {key: 'emergencyContactNumber', label: 'Emergency Contact Number'},
];

export const formatEmergencyContactValue = (
  value: EmergencyContactValues[keyof EmergencyContactValues],
) => {
  return getDisplayValue(value);
};
