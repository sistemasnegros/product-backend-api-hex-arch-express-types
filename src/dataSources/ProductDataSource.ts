import productRepository from '../core/repositories/productRepository';
import Product from '../core/entities/product/Product';
import ProductModel from './sequelize/models/ProductModel';
import ProductSearch from '../core/entities/product/ProductSearch';
import { FindOptions, WhereAttributeHash } from 'sequelize/types';
import { genDefaultOptions } from './sequelize/utils/utils';

class ProductDataSource implements productRepository {
  public async getById(id: number): Promise<Product> {
    const productModel: Product = await ProductModel.findOne({ where: { id } });
    return productModel;
  }

  public async create(product: Product): Promise<Product> {
    const productModel: Product = await ProductModel.create(product);
    return productModel;
  }

  public async update(id: number, product: Product): Promise<Product> {
    await ProductModel.update(product, {
      where: { id },
    });
    const productModel = await ProductModel.findByPk(id);
    return productModel;
  }

  public async delete(id: number): Promise<number> {
    const productModel: number = await ProductModel.destroy({
      where: { id },
    });
    return productModel;
  }

  public async search(query: ProductSearch): Promise<Product[]> {
    const { id, name, sort, limit, offset, page } = query;
    const where: WhereAttributeHash = {};

    if (id) {
      where.id = id;
    }
    if (name) {
      where.name = name;
    }

    const options: FindOptions = await genDefaultOptions(
      { sort, limit, offset, page },
      ProductModel,
      where,
    );

    const productModel: Product[] = await ProductModel.findAll(options);
    return productModel;
  }
}

export default ProductDataSource;
