export interface User {
  phone: string;
  email: string;
  name: string;
  lastname: string;
  city: string;
  branchnum_np: string;
  avatar: string;
}

export interface UserPost {
  phone: string;
  password: string;
  name?: string;
}

export interface UserLogin {
  phone: string;
  password: string;
}

export interface UserProfile {
  name: string;
  lastname: string;
  phone: string;
  city: string;
  branchnum_np: string;
  email: string;
  avatar: string;
}
