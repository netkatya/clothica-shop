import { isAxiosError } from 'axios';
import { nextServer } from './api';
import {
  LoginRequest,
  RegisterRequest,
  RequestResetPassword,
  ResetPassword,
  UpdateRequest,
} from '@/types/auth';
import { User } from '@/types/user';
import { ColorOfGood, Gender, Good, Size } from '@/types/good';
import { Category } from '@/types/category';
import { Order, OrderStatus, CreateOrderParams } from '@/types/order';
// import { getCurrentDate } from '../utils';
import { Feedback, FeedbackPost } from '@/types/feedback';

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const requestResetPassword = async (data: RequestResetPassword) => {
  const res = await nextServer.post<User>('/auth/requestResetPassword', data);
  return res.data;
};

export const resetPassword = async (data: ResetPassword) => {
  const res = await nextServer.post<User>('/auth/resetPassword', data);
  return res.data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/profile');
  return data;
};

export async function getTelegramLinked(): Promise<{ isLinked: boolean }> {
  try {
    const { data } = await nextServer.get<User>('/users/profile');
    if (data.telegramLinked) {
      return { isLinked: true };
    } else {
      return { isLinked: false };
    }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Getting Telegram linked status failed'
      );
    }
    throw new Error('Getting Telegram linked status failed');
  }
}

export interface TelegramLinkResponse {
  success: boolean;
  data: {
    link: string;
  };
}

export const getMeTelegramLink = async (): Promise<TelegramLinkResponse> => {
  const res = await nextServer.get<TelegramLinkResponse>(
    '/users/profile/telegramLink'
  );
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export async function updateMe(update: Partial<UpdateRequest>): Promise<User> {
  try {
    const { data } = await nextServer.patch<User>('/users/profile', update);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Updating profile failed'
      );
    }
    throw new Error('Updating profile failed');
  }
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

export interface paginationMeta {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface FetchGoodsResponse {
  data: Good[];
  success: boolean;
  message?: string;
  meta: paginationMeta;
}

export interface FetchGoodByIdResponse {
  data: Good;
  success: boolean;
  message?: string;
}

export interface FetchGoodsParam {
  page?: string;
  perPage?: string;
  gender?: Gender;
  category?: string;
  size?: Size[];
  colors?: ColorOfGood[];
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FetchCategoriesResponse {
  categories: Category[];
  totalPages: number;
}

export interface FetchCategoriesParam {
  page: string;
  perPage: string;
}

export async function fetchGoodsClient(
  param: FetchGoodsParam
): Promise<FetchGoodsResponse> {
  const {
    page = 1,
    perPage = 12,
    gender,
    category,
    size,
    colors,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
  } = param;
  try {
    const params: FetchGoodsParam = {
      page: String(page),
      perPage: String(perPage),
    };
    if (gender) params.gender = gender;
    if (category) params.category = category;
    if (size) params.size = size;
    if (colors) params.colors = colors;
    if (minPrice) params.minPrice = String(minPrice);
    if (maxPrice) params.maxPrice = String(maxPrice);
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;

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

export async function fetchGoodById(
  id: string
): Promise<FetchGoodByIdResponse> {
  try {
    const { data } = await nextServer.get<FetchGoodByIdResponse>(
      `/goods/${id}`,
      { withCredentials: false }
    );
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

    const { data } = await nextServer.get<FetchCategoriesResponse>(
      '/categories',
      {
        params,
      }
    );
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

export const createOrderClient = async (
  CreateOrderParams: CreateOrderParams
): Promise<Order> => {
  try {
    const { data } = await nextServer.post<Order>('/orders', {
      goods: CreateOrderParams.goods,
      sum: CreateOrderParams.sum,
      status: CreateOrderParams.status || 'new',
      userName: CreateOrderParams.userName,
      userLastName: CreateOrderParams.userLastName,
      userPhone: CreateOrderParams.userPhone,
      city: CreateOrderParams.city,
      branchnum_np: CreateOrderParams.branchnum_np,
      ...(CreateOrderParams.comment && { comment: CreateOrderParams.comment }),
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Creating order failed');
    }
    throw new Error('Creating order failed');
  }
};

export const fetchOrdersClient = async (): Promise<Order[]> => {
  try {
    const { data } = await nextServer.get<Order[]>('/orders');
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Fetching orders failed'
      );
    }
    throw new Error('Fetching orders failed');
  }
};

export const updateOrderClient = async (
  orderNum: string,
  status: OrderStatus
): Promise<Order> => {
  try {
    const { data } = await nextServer.patch<Order>(
      `/orders/${orderNum}/status`,
      {
        status,
      }
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Creating order failed');
    }
    throw new Error('Creating order failed');
  }
};

export interface FetchFeedbackParam {
  page: string;
  perPage: string;
  good?: string;
  category?: string;
  rate?: string;
}

export interface FetchFeedbackResponse {
  feedbacks: Feedback[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export async function fetchFeedbacksClient({
  page,
  perPage,
  good,
  category,
  rate,
}: FetchFeedbackParam): Promise<FetchFeedbackResponse> {
  try {
    const params: FetchFeedbackParam = {
      page: String(page),
      perPage: String(perPage),
    };
    if (good) params.good = good;
    if (category) params.category = category;
    if (rate) params.rate = rate;

    const { data } = await nextServer.get<FetchFeedbackResponse>('/feedbacks', {
      params,
      withCredentials: false,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Fetching feedbacks failed'
      );
    }
    throw new Error('Fetching feedbacks failed');
  }
}

export const createFeedbackClient = async (
  feedback: Partial<FeedbackPost>
): Promise<Feedback> => {
  try {
    const { data } = await nextServer.post<Feedback>('/feedbacks', feedback);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Creating feedback failed'
      );
    }
    throw new Error('Creating feedback failed');
  }
};

interface SubscriptionRequest {
  email: string;
}

interface SubscriptionResponse {
  message: string;
}

export const createSubscriptionClient = async (
  subscription: SubscriptionRequest
): Promise<SubscriptionResponse> => {
  try {
    const { data } = await nextServer.post<SubscriptionResponse>(
      '/subscription',
      subscription
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Creating subscription failed'
      );
    }
    throw new Error('Creating subscription failed');
  }
};
