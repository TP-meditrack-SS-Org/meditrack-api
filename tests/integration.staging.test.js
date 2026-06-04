'use strict';

const request = require('supertest');
const app = require('../src/app');

describe('Staging integration checks', () => {
  test('staging secrets are available and well-formed', () => {
    expect(process.env.STAGING_API_KEY).toBeTruthy();
    expect(process.env.STAGING_API_KEY).toMatch(/^sk_/);

    expect(process.env.STAGING_DATABASE_URL).toBeTruthy();
    expect(() => new URL(process.env.STAGING_DATABASE_URL)).not.toThrow();
  });

  test('GET /health responds with staging configuration loaded', async () => {
    const res = await request(app)
      .get('/health')
      .set('x-api-key', process.env.STAGING_API_KEY);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
