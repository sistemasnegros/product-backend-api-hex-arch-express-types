import ProductInteractor from './productInteractor';
import ProductDataSource from '../../dataSources/ProductDataSource';

import UserInteractor from './userInteractor';
import UserDataSource from '../../dataSources/UserDataSource';

const productDataSource = new ProductDataSource();
const productInteractor = new ProductInteractor(productDataSource);

const userDataSource = new UserDataSource();
const userInteractor = new UserInteractor(userDataSource);

export { productInteractor, userInteractor };
