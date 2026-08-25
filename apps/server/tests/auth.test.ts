import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../src/server';
import { User } from '../src/models/User';

const request = supertest(app);

describe('Auth & Security API Integration Tests', () => {
  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    // Connect to local test DB or memory
    const testDbUri = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/farms_test_db';
    try {
      await mongoose.connect(testDbUri);
    } catch {
      // Fallback if local mongo isn't available
    }
  });

  afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
      await User.deleteMany({ email: /@test\.com$/ });
      await mongoose.disconnect();
    }
  });

  it('GET /api/v1/health should return health status 200', async () => {
    const res = await request.get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.status).toBe('ok');
  });

  it('POST /api/v1/auth/register should validate invalid email format', async () => {
    const res = await request.post('/api/v1/auth/register').send({
      name: 'Test User',
      email: 'invalid-email',
      password: 'password123',
    });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });
});
