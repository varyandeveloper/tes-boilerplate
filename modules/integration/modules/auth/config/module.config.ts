import JWTProvider from '../providers/jwt.provider';
import AbstractProvider from '../providers/abstract.provider';

export const PROVIDER = process.env.AUTH_PROVIDER || 'JWT';

export const AUTH = {
  JWT: {
    CLASS: JWTProvider,
    EXPIRES_IN_MINUTES: 15,
    REQUEST_HEADER_NAME: 'Authorization',
    SECRET_KEY: process.env.JWT_SECRET_KEY,
    RESPONSE_HEADER_NAME: 'Renewed-Authorization',
  },
};

export const getProvider = (
  provider: string = PROVIDER
): any | AbstractProvider => {
  return AUTH[provider].CLASS;
};
