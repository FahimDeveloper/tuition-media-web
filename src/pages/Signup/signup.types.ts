export type GenderValue = 'male' | 'female' | 'other' | 'prefer_not_to_say';

export interface SignupFormValues {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  gender: GenderValue;
  city: string;
  location: string;
  password?: string;
  confirmPassword?: string;
}
