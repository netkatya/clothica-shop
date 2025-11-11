import { AxiosError } from 'axios';

export type RegisterRequest = {
  phone: string;
  password: string;
};

export type LoginRequest = {
  phone: string;
  password: string;
};

export type UpdateRequest = {
  name: string;
  lastname: string;
  city: string;
  branchnum_np: string;
  email: string;
};

export type SessionResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type RequestResetEmail = {
  phone: string;
};

export type ResetPassword = {
  phone: string;
  code: string;
  password: string;
};

export type ApiError = AxiosError<{ error: string }>;
