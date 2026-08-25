import mongoose from 'mongoose';
import dns from 'dns';
import { env } from './env';

// Attempt to use Google/Cloudflare public DNS servers if available
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore in serverless cloud environments
}

let cachedPromise: Promise<typeof mongoose> | null = null;

export const connectDB = async (): Promise<typeof mongoose> => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!cachedPromise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };
    cachedPromise = mongoose.connect(env.MONGODB_URI, opts).then((m) => {
      console.log(`[MongoDB] Connected successfully to ${m.connection.host}`);
      return m;
    });
  }

  try {
    return await cachedPromise;
  } catch (error) {
    cachedPromise = null;
    console.error('[MongoDB] Connection error:', error);
    throw error;
  }
};
