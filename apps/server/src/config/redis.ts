import Redis from 'ioredis';
import { env } from './env';

class RedisManager {
  private client: Redis | null = null;
  private isConnected = false;
  private memoryStore = new Map<string, string>();

  constructor() {
    try {
      this.client = new Redis(env.REDIS_URL, {
        maxRetriesPerRequest: 1,
        retryStrategy: (times) => {
          if (times > 3) {
            console.warn('Redis connection failed. Falling back to in-memory store.');
            return null;
          }
          return Math.min(times * 100, 2000);
        },
        lazyConnect: true,
      });

      this.client.on('connect', () => {
        this.isConnected = true;
        console.log('Redis connected successfully.');
      });

      this.client.on('error', (err) => {
        this.isConnected = false;
        // Silent catch for dev fallback
      });

      this.client.connect().catch(() => {
        this.isConnected = false;
      });
    } catch (e) {
      this.isConnected = false;
    }
  }

  async get(key: string): Promise<string | null> {
    if (this.isConnected && this.client) {
      try {
        return await this.client.get(key);
      } catch {
        return this.memoryStore.get(key) || null;
      }
    }
    return this.memoryStore.get(key) || null;
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<'OK'> {
    if (this.isConnected && this.client) {
      try {
        if (ttlSeconds) {
          await this.client.set(key, value, 'EX', ttlSeconds);
        } else {
          await this.client.set(key, value);
        }
        return 'OK';
      } catch {
        // Fallback
      }
    }
    this.memoryStore.set(key, value);
    if (ttlSeconds) {
      setTimeout(() => this.memoryStore.delete(key), ttlSeconds * 1000);
    }
    return 'OK';
  }

  async del(key: string): Promise<number> {
    if (this.isConnected && this.client) {
      try {
        return await this.client.del(key);
      } catch {
        // Fallback
      }
    }
    const existed = this.memoryStore.has(key);
    this.memoryStore.delete(key);
    return existed ? 1 : 0;
  }
}

export const redis = new RedisManager();
