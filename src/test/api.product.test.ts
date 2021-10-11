import { app, server } from '../server';
import request from 'supertest';
import API_URL from '../const/url';
import User from '../dataSources/sequelize/models/UserModel';
import Product from '../dataSources/sequelize/models/ProductModel';

const productTest = {
  id: 10000,
  name: 'Pikachu Doll',
  detail: 'details',
  price: 100000,
  image: 'https://imagen.png',
};

const productUpdateTest = {
  detail: 'details update',
  price: 50000,
};
const typeAuth = 'bearer';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDAsInVzZXJuYW1lIjoic2lzdGVtYXNuZWdyb3MiLCJpYXQiOjE2MzM3NTY5OTN9.eVX2fRBlHN98jRCuRL7QnzUy_YpiGXgtGL8sekjGKts';

// const authorization = 'Authorization';
// const authorizationValue = `Bearer ${token}`;

const query = `?&name=${productTest.name}`;

describe(`Endpoint ${API_URL.PRODUCT} - product CRUD`, () => {
  it('POST - Create product', async () => {
    const result = await request(app)
      .post(API_URL.PRODUCT)
      .auth(token, { type: typeAuth })
      .send(productTest);
    expect(result.statusCode).toEqual(201);
    expect(result.body.name).toBe(productTest.name);
  });

  it('GET - READ Filter product for name', async () => {
    const result = await request(app)
      .get(`${API_URL.PRODUCT}${query}`)
      .auth(token, { type: typeAuth });
    expect(result.statusCode).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
    expect(result.body[0].name).toBe(productTest.name);
  });

  it('GET - READ all product in a array', async () => {
    const result = await request(app)
      .get(API_URL.PRODUCT)
      .auth(token, { type: typeAuth });
    expect(result.statusCode).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
  });

  it('PUT - UPDATE a product', async () => {
    const result = await request(app)
      .put(`${API_URL.PRODUCT}/${productTest.id}`)
      .auth(token, { type: typeAuth })
      .send(productUpdateTest);
    expect(result.statusCode).toEqual(200);
    expect(result.body.price).toBe(productUpdateTest.price);
  });

  it('GET - READ a product in', async () => {
    const result = await request(app)
      .get(`${API_URL.PRODUCT}/${productTest.id}`)
      .auth(token, { type: typeAuth });
    expect(result.statusCode).toEqual(200);
    expect(result.body.id).toBe(productTest.id);
  });

  it('DELETE - DELETE a product', async () => {
    const result = await request(app)
      .delete(`${API_URL.PRODUCT}/${productTest.id}`)
      .auth(token, { type: typeAuth });
    expect(result.statusCode).toEqual(204);
  });
});

const userTest = {
  id: 10000,
  username: 'sistemasnegros',
  firstname: 'kevin',
  lastname: 'franco',
  password: 'mypassowrd',
};

afterAll(() => {
  User.destroy({ where: { id: userTest.id } });
  Product.destroy({ where: { id: productTest.id } });
  server.close();
});

beforeAll(async () => {
  await User.create(userTest);
});
