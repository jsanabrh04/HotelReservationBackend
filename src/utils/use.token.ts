import {
  AuthTokenExpire,
  AuthTokenResult,
} from 'src/interfaces/auth.interface';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): AuthTokenExpire | string => {
  try {
    const decode = jwt.decode(token) as AuthTokenResult;
    const currentDate = new Date();
    const expiresDate = new Date(decode.exp);
    return {
      userId: decode.userId,
      role: decode.role,
      sub: decode.sub,
      isExpired: +expiresDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'Token is invalid';
  }
};
