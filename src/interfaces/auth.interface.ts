import { Role } from 'src/models/roles.model';

export interface PayloadToken {
  sub: string;
  userId: number;
  role: Role;
}

export interface AuthTokenResult {
  userId: number;
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface AuthTokenExpire {
  userId: number;
  role: string;
  sub: string;
  isExpired: boolean;
}
