import { isAxiosError } from 'axios';
import { nextServer } from './api';
import {
  LoginRequest,
  RegisterRequest,
  RequestResetEmail,
  ResetPassword,
  UpdateRequest,
} from '@/types/auth';
import { User } from '@/types/user';
import { Gender, Good, Size } from '@/types/goods';
import { Category } from '@/types/categoty';

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

export interface FetchGoodsResponse {
  data: Good[];
  totalPage: number;
}

export interface FetchGoodsParam {
  page: string;
  perPage: string;
  gender?: Gender;
  size?: Size[];
  minPrice?: string;
  maxPrice?: string;
}

export interface FetchCategoriesResponse {
  data: Category[];
  totalPage: number;
}

export interface FetchCategoriesParam {
  page: string;
  perPage: string;
}

export async function fetchGoodsClient(
  page = 1,
  perPage = 12,
  gender?: Gender,
  size?: Size[],
  minPrice?: number,
  maxPrice?: number
): Promise<FetchGoodsResponse> {
  try {
    const params: FetchGoodsParam = {
      page: String(page),
      perPage: String(perPage),
    };
    if (gender) params.gender = gender;
    if (size) params.size = size;
    if (minPrice) params.minPrice = String(minPrice);
    if (maxPrice) params.maxPrice = String(maxPrice);

    const { data } = await nextServer.get<FetchGoodsResponse>('/goods', {
      params,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Fetching goods failed');
    }
    throw new Error('Fetching goods failed');
  }
}

export async function fetchGoodById(id: string): Promise<Good> {
  try {
    const { data } = await nextServer.get<Good>(`/goods/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Fetching good failed');
    }
    throw new Error('Fetching good failed');
  }
}

export async function fetchCategoriesClient(
  page = 1,
  perPage = 6
): Promise<FetchCategoriesResponse> {
  try {
    const params: FetchCategoriesParam = {
      page: String(page),
      perPage: String(perPage),
    };

    const { data } = await nextServer.get<FetchGoodsResponse>('/categories', {
      params,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Fetching categories failed'
      );
    }
    throw new Error('Fetching categories failed');
  }
}
