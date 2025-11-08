import { nextServer } from './api';
import {
  LoginRequest,
  RegisterRequest,
  RequestResetEmail,
  ResetPassword,
  UpdateRequest,
} from '@/types/auth';
import { User } from '@/types/user';

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const requestResetEmail = async (data: RequestResetEmail) => {
  const res = await nextServer.post<User>('/auth/requestPasswordReset', data);
  return res.data;
};

export const resetPassword = async (data: ResetPassword) => {
  const res = await nextServer.post<User>('/auth/resetPassword', data);
  return res.data;
};

export const getMe = async () => {
  const res = await nextServer.get<User>('/users/profile');
  return res.data;
};

export const getMeTelegramLink = async () => {
  const res = await nextServer.get<User>('/users/profile/telegramLink');
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export async function updateMe(update: Partial<UpdateRequest>): Promise<User> {
  const { data } = await nextServer.patch<User>('/users/profile', update);
  return data;
}

export async function updateMeAvatar(update: File): Promise<User> {
  const dataFile = new FormData();
  dataFile.append('avatar', update);

  const { data } = await nextServer.patch<User>(
    '/users/profile/avatar',
    dataFile
  );
  return data;
}
