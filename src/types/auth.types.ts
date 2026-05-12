export type AuthGender = "male" | "female" | "other";

export type AuthUser = {
  _id: string;
  full_name: string;
  email: string;
  password: string;
  phone: string;
  gender: AuthGender;
  date_of_birth: string;
  years_of_experience: number;
  will_teach_online: boolean;
  isProfileCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  role?: string | null;
  avatar?: string | null;
  image?: string | null;
  profile_image?: string | null;
  profileImage?: string | null;
};

export type AuthSession = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

export type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
};

export type AuthSuccessResponse = {
  message?: string;
  results: AuthSession;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegistrationPayload = {
  full_name: string;
  phone: string;
  email: string;
  password: string;
};
