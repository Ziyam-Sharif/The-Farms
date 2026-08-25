import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { env } from './env';

export const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://js.stripe.com', 'https://maps.googleapis.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com', 'https://images.unsplash.com', 'https://*.stripe.com'],
      connectSrc: ["'self'", env.WEB_ORIGIN, env.ADMIN_ORIGIN, 'https://api.stripe.com'],
      frameSrc: ["'self'", 'https://js.stripe.com', 'https://www.google.com'],
    },
  },
  crossOriginResourcePolicy: { policy: 'cross-origin' },
});

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    const allowedOrigins = [env.WEB_ORIGIN, env.ADMIN_ORIGIN];
    // Allow requests with no origin (like mobile apps, curl, postman) in development
    if (!origin || allowedOrigins.includes(origin) || env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('CORS Policy: Origin not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per 15 min
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
    error: { code: 'TOO_MANY_REQUESTS' },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: {
    success: false,
    message: 'Too many requests. Please slow down.',
    error: { code: 'TOO_MANY_REQUESTS' },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const orderRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 8, // max 8 orders per 10 mins per IP
  message: {
    success: false,
    message: 'Too many order requests from this network. Please wait a few minutes or contact support.',
    error: { code: 'ORDER_RATE_LIMITED' },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const mongoSanitizeMiddleware = mongoSanitize();

