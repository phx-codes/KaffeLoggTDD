import { describe, test, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from './app.js';

beforeAll(() => {
  process.env.NODE_ENV = 'test';
});

describe('Express API Integrationstester', () => {

  test('GET /blockchain ska returnera status 200 och blockkedjan', async () => {
    const res = await request(app).get('/blockchain');
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('chain');
    expect(res.body).toHaveProperty('pendingTransactions');
  });

  test('POST /transactions ska lägga till en transaktion', async () => {
    const newTx = {
      sender: "Göran",
      recipient: "Arvid",
      batchId: "Kaffe-456",
      weightKg: 120
    };

    const res = await request(app)
      .post('/transactions')
      .send(newTx);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Transaction added successfully');
  });
  
});