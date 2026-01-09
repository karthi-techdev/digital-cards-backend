import { Express } from 'express';
import faqRoutes from './faq.routes';
import userAuthRoutes from './user.routes'; 

const BASE_URL = '/api/v1';

export const registerRoutes = (app: Express): void => {
  // FAQ Routes
  app.use(`${BASE_URL}/faqs`, faqRoutes);
  app.use(`${BASE_URL}/auth`, userAuthRoutes);
};