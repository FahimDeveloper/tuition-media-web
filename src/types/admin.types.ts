export type TAdmin = {
  _id: string;
  full_name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  profile_picture?: string;
  isActive: boolean;
  isDeleted: boolean;
  allowed_ip?: string[];
  last_login?: Date;
};

export type TAllAdmins = [TAdmin];
