import ProductModel from './models/ProductModel';
import UserModel from './models/UserModel';

ProductModel.sync({ alter: true });
UserModel.sync({ alter: true });
