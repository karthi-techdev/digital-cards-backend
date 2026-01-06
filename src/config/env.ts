import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  port: Number.parseInt(process.env.PORT as string, 10) || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/digitalcards',
  jwtSecretKey:process.env.JWT_SECRET??'digitalcards-product@1234567890',
  jwtAccessExpiration:process.env.JWT_ACCESS_EXPIRATION ??'15m',
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },
  nodeEnv: (process.env.NODE_ENV as string) || 'development',
  apiPrefix: process.env.API_PREFIX || '/api',
};
