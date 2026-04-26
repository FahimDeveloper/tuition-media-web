import type {Rule} from 'antd/es/form';

export const requiredRule = (message: string): Rule[] => [
  {required: true, message},
];

export const arrayRequiredRule = (message: string): Rule[] => [
  {
    required: true,
    type: 'array',
    min: 1,
    message,
  },
];

export const getDisplayValue = (value?: string | boolean | number | null) => {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'number') return String(value);
  return value?.trim() || 'Not provided';
};

export const getArrayDisplayValue = (value?: string[]) => {
  return value?.length ? value.join(', ') : 'Not provided';
};
