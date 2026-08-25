import dotenv from 'dotenv';
import { z } from 'zod';
import path from 'path';

// Load .env from root or local directory
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  MONGODB_URI: z.string().default('mongodb://localhost:27017/farms_db'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  JWT_SECRET: z.string().default('super-secret-jwt-key-change-in-production-farms-2026'),
  JWT_REFRESH_SECRET: z.string().default('super-secret-refresh-key-change-in-production-farms-2026'),
  WEB_ORIGIN: z.string().default('http://localhost:5173'),
  ADMIN_ORIGIN: z.string().default('http://localhost:5174'),
});

export const env = envSchema.parse(process.env);
