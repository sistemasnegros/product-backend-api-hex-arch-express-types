import { app, server } from '../server';
import request from 'supertest';

describe('GET / - Starting API', () => {
  it('Response status 200/ ', async () => {
    const result = await request(app).get('/');
    expect(result.statusCode).toEqual(200);
  });
});

afterAll(() => {
  server.close();
});
