import {type SignupFormValues} from './signup.types';

export const prepareSignupPayload = (values: SignupFormValues) => {
  const normalizePhone = (val: string) => {
    // Strips common formatting and adds country code for consistency
    const digits = val.replace(/[()\s-]/g, '');
    return digits.startsWith('01') ? `+88${digits}` : digits;
  };

  return {
    ...values,
    first_name: values.first_name.trim(),
    last_name: values.last_name.trim(),
    email: values.email.toLowerCase().trim(),
    phone: normalizePhone(values.phone),
  };
};
