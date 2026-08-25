import dotenv from 'dotenv';
import { z } from 'zod';
import path from 'path';

// Load .env from root or local directory if present
try {
  dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });
  dotenv.config();
} catch {
  // Ignore in serverless cloud environments
}

const DEFAULT_ATLAS_URI = 'mongodb+srv://farms_admin:QVtrqICqAdqGvg1N@cluster0.j1egxfs.mongodb.net/farms_db?retryWrites=true&w=majority&appName=Cluster0';
const DEFAULT_JWT_SECRET = 'acb4e505474c84731ac60ce62ed886d880a7c75a722075654d6bf49450ef3a8b';
const DEFAULT_REFRESH_SECRET = 'd1e0855dd8660c604de98a3fab32eb9ecb2f253ab6ba004628bb9ff27d9944bb';

const envSchema = z.object({
  NODE_ENV: z.string().default('production'),
  PORT: z.string().default('5000'),
  MONGODB_URI: z.string().default(DEFAULT_ATLAS_URI),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  JWT_SECRET: z.string().default(DEFAULT_JWT_SECRET),
  JWT_REFRESH_SECRET: z.string().default(DEFAULT_REFRESH_SECRET),
  WEB_ORIGIN: z.string().default('http://localhost:5173'),
  ADMIN_ORIGIN: z.string().default('http://localhost:5174'),
});

export const env = envSchema.parse(process.env);
