export interface User {
  email: string;
  phone: string;
  name: string;
  avatar: string;
  telegramChatId: string | null;
  telegramLinked: boolean;
  id: string;
}

export interface UserPost {
  email?: string;
  phone: string;
  name?: string;
  password: string;
}

export interface UserLogin {
  phone: string;
  password: string;
}
