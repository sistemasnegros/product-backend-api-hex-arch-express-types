import { app, server } from '../server';
import request from 'supertest';
import API_URL from '../const/url';

const userTest = {
  id: 20000,
  username: 'user1',
  firstname: 'Paco',
  lastname: 'Rabal',
  password: 'mypassowrd',
};

const userTestLogin = {
  username: userTest.username,
  password: userTest.password,
};

const userUpdateTest = {
  username: 'user2',
  password: 'mypassowrd2',
};

const query = `?&username=${userTest.username}`;

describe(`Endpoint ${API_URL.USER} - user CRUD`, () => {
  it('POST - Create user', async () => {
    const result = await request(app).post(API_URL.USER).send(userTest);
    expect(result.statusCode).toEqual(201);
    expect(result.body.username).toBe(userTest.username);
  });

  it('GET - READ Filter user for username', async () => {
    const result = await request(app).get(`${API_URL.USER}${query}`);
    expect(result.statusCode).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
    expect(result.body[0].username).toBe(userTest.username);
  });

  it('GET - READ all user in a array', async () => {
    const result = await request(app).get(API_URL.USER);
    expect(result.statusCode).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
  });

  it('POST - Login user', async () => {
    const result = await request(app)
      .post(`${API_URL.USER}${API_URL.LOGIN}`)
      .send(userTestLogin);
    expect(result.statusCode).toEqual(200);
    expect('token' in result.body).toBe(true);
  });

  it('PUT - UPDATE a user', async () => {
    const result = await request(app)
      .put(`${API_URL.USER}/${userTest.id}`)
      .send(userUpdateTest);
    expect(result.statusCode).toEqual(200);
    expect(result.body.username).toBe(userUpdateTest.username);
  });

  it('GET - READ a user in', async () => {
    const result = await request(app).get(`${API_URL.USER}/${userTest.id}`);
    expect(result.statusCode).toEqual(200);
    expect(result.body.id).toBe(userTest.id);
  });

  it('DELETE - DELETE a user', async () => {
    const result = await request(app).delete(`${API_URL.USER}/${userTest.id}`);
    expect(result.statusCode).toEqual(204);
  });
});

afterAll(() => {
  server.close();
});
