import sequelize from '../dataSources/sequelize';

describe('DB Test ', () => {
  it('conect DB', async () => {
    try {
      await sequelize.authenticate();
      //   console.log('Connection has been established successfully.');
    } catch (error) {
      //   console.error('Unable to connect to the database:', error);
    }
  });
});

afterAll(() => {
  sequelize.close();
});
