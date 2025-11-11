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
import { Gender, Good, Size } from '@/types/good';
import { Category } from '@/types/category';
import { Order, OrderStatus, CreateOrderParams } from '@/types/order';
import { getCurrentDate } from '../utils';
import { Feedback } from '@/types/feedback';

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

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/profile');
  return data;
};

export const getMeTelegramLink = async () => {
  const res = await nextServer.get<User>('/users/profile/telegramLink');
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



export interface FetchGoodsResponse {
  data: Good[];
  totalPage: number;
}

export interface FetchGoodsParam {
  page: string;
  perPage: string;
  gender?: Gender;
  category?: string;
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
  category?: string,
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
    if (category) params.category = category;
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

export const createOrderClient = async (CreateOrderParams: CreateOrderParams): Promise<Order> => {
  try {
    const { data } = await nextServer.post<Order>('/orders', {
      goods: CreateOrderParams.goods,
      date: getCurrentDate(),
      sum: CreateOrderParams.sum,
      status: 'new',
      userName: CreateOrderParams.userName,
      userLastName: CreateOrderParams.userLastName,
      userPhone: CreateOrderParams.userPhone,
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
  goodId?: string;
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
  goodId,
  category,
  rate,
}: FetchFeedbackParam): Promise<FetchFeedbackResponse> {
  try {
    const params: FetchFeedbackParam = {
      page: String(page),
      perPage: String(perPage),
    };
    if (goodId) params.goodId = goodId;
    if (category) params.category = category;
    if (rate) params.rate = rate;

    const { data } = await nextServer.get<FetchFeedbackResponse>('/feedbacks', {
      params,
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
  feedback: Partial<Feedback>
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
