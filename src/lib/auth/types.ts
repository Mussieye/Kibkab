export type UserRole = "admin" | "editor" | "member";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
  phone?: string;
  address?: string;
  membershipDate?: string;
  profileImage?: string;
}

export interface AuthSession {
  user: Omit<User, "createdAt" | "lastLogin">;
  token: string;
  expiresAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}
