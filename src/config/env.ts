import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is missing in .env file');
}

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is missing in .env file');
}

export const ENV = {
  port: Number(process.env.PORT) || 5000,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },
  nodeEnv: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || '/api',
};

