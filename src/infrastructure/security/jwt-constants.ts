export const ADMINISTRATOR_CONSTANTS = {
  secret: process.env.ADMINISTRATOR_JWT_ACCESS_SECRET,
  refreshSecret: process.env.ADMINISTRATOR_JWT_REFRESH_SECRET,
  expiresIn: '5m',
  refreshExpiresIn: '30d',
};

export const CLIENT_CONSTANTS = {
  secret: process.env.CLIENT_JWT_ACCESS_SECRET,
  refreshSecret: process.env.CLIENT_JWT_REFRESH_SECRET,
  expiresIn: '5m',
  refreshExpiresIn: '30d',
};

export interface ITokenPayload {
  sub: string;
  iat: number;
  expiresIn: number;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface IRefreshToken {
  accessToken: string;
  expiresIn: number;
}
