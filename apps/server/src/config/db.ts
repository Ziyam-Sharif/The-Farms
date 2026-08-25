import mongoose from 'mongoose';
import dns from 'dns';
import { env } from './env';

// Ensure Google/Cloudflare public DNS servers are used for reliable SRV resolution on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch {
  // fallback if environment restricts DNS overrides
}

export const connectDB = async (): Promise<typeof mongoose> => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('[MongoDB] Connection error:', error);
    throw error;
  }
};
