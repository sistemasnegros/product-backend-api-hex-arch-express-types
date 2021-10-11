import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const { DB_URI_DEV, DB_URI_TEST, DB_URI_PRO, NODE_ENV } = process.env;

const DB_URI =
  NODE_ENV === 'dev'
    ? DB_URI_DEV
    : NODE_ENV === 'test'
    ? DB_URI_TEST
    : DB_URI_PRO;

const sequelize = new Sequelize(DB_URI, {
  logging: false,
});

export default sequelize;
