export type UserRole = 'customer' | 'admin' | 'editor';

export interface IUserAddress {
  _id?: string;
  label: string;
  street: string;
  city: string;
  province: string;
  isDefault: boolean;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  addresses: IUserAddress[];
  refreshTokenVersion: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}
