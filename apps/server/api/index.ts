import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from '../src/routes/auth.routes';
import productRoutes from '../src/routes/product.routes';
import orderRoutes from '../src/routes/order.routes';
import categoryRoutes from '../src/routes/category.routes';
import blogRoutes from '../src/routes/blog.routes';
import reviewRoutes from '../src/routes/review.routes';
import contactRoutes from '../src/routes/contact.routes';
import newsletterRoutes from '../src/routes/newsletter.routes';
import adminRoutes from '../src/routes/admin.routes';
import { errorHandler } from '../src/middlewares/errorHandler';
import { connectDB } from '../src/config/db';

const app: express.Application = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Connect DB middleware
app.use(async (_req, _res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }
  } catch (err: any) {
    console.error('Serverless DB error:', err.message || err);
  }
  next();
});

app.get('/api/v1/health', (_req, res) => {
  res.json({
    success: true,
    status: 'ok',
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

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/blog', blogRoutes);
app.use('/api/v1', reviewRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/newsletter', newsletterRoutes);
app.use('/api/v1/admin', adminRoutes);

app.use(errorHandler);

export default async function handler(req: Request, res: Response) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    return (app as any)(req, res);
  } catch (error: any) {
    console.error('Handler runtime error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
}
