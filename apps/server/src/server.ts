import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { env } from './config/env';
import { connectDB } from './config/db';
import {
  helmetMiddleware,
  corsMiddleware,
  apiRateLimiter,
  mongoSanitizeMiddleware,
} from './config/security';
import { errorHandler } from './middlewares/errorHandler';

import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import categoryRoutes from './routes/category.routes';
import blogRoutes from './routes/blog.routes';
import reviewRoutes from './routes/review.routes';
import contactRoutes from './routes/contact.routes';
import newsletterRoutes from './routes/newsletter.routes';
import adminRoutes from './routes/admin.routes';

const app: express.Application = express();

// Ensure DB connection for Serverless / Vercel Edge requests
app.use(async (_req, _res, next) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
    } catch (err: any) {
      console.warn('[Serverless DB] Connect notice:', err.message || err);
    }
  }
  next();
});

// Core & Security Middlewares
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(mongoSanitizeMiddleware);
app.use('/api/v1', apiRateLimiter);

// Health Check
app.get('/api/v1/health', (_req, res) => {
  res.json({
    success: true,
    status: 'ok',
    environment: env.NODE_ENV,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting/standby',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: "The Farm's Foods API is Live & Operational.",
    healthEndpoint: '/api/v1/health',
    version: '1.0.0',
  });
});

// Domain API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/blog', blogRoutes);
app.use('/api/v1', reviewRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/newsletter', newsletterRoutes);
app.use('/api/v1/admin', adminRoutes);

// Centralized Error Handler
app.use(errorHandler);

// Standalone server execution ONLY when run directly in CLI (NEVER inside serverless lambdas)
const isDirectCliRun = typeof require !== 'undefined' && require.main === module;
if (isDirectCliRun && !process.env.VERCEL && !process.env.NOW_REGION) {
  connectDB()
    .then(() => {
      console.log('[Server] MongoDB connected successfully.');
    })
    .catch((err) => {
      console.warn('[Server] MongoDB notice (running in standby/fallback mode):', err.message || err);
    })
    .finally(() => {
      app.listen(env.PORT, () => {
        console.log(`[Server] API running on http://localhost:${env.PORT}/api/v1`);
      });
    });
}

export default app;
