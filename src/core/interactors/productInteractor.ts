import ProductRepository from '../repositories/productRepository';
import ProductEntity from '../entities/product/Product';
import ProductSearch from '../entities/generic/Search';
import ERRORS from '../../const/errors';

class ProductInteractor {
  productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async getById(id: number): Promise<ProductEntity> {
    const productModel: ProductEntity = await this.productRepository.getById(
      id,
    );
    if (!productModel) {
      throw new Error(ERRORS.ID_NOT_FOUND);
    }

    return productModel;
  }

  async search(query: ProductSearch): Promise<ProductEntity[]> {
    const productModel: ProductEntity[] = await this.productRepository.search(
      query,
    );
    if (!productModel) {
      throw new Error(ERRORS.INTERNAL_ERROR);
    }
    return productModel;
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    const productModel: ProductEntity = await this.productRepository.create(
      product,
    );
    if (!productModel) {
      throw new Error(ERRORS.INTERNAL_ERROR);
    }
    return productModel;
  }

  async update(id: number, product: ProductEntity): Promise<ProductEntity> {
    const productModel: ProductEntity = await this.productRepository.update(
      id,
      product,
    );
    if (!productModel) {
      throw new Error(ERRORS.INTERNAL_ERROR);
    }
    return productModel;
  }

  async delete(id: number): Promise<any> {
    const productModel: number = await this.productRepository.delete(id);

    if (!productModel) {
      throw new Error(ERRORS.INTERNAL_ERROR);
    }
    return { status: 'ok', msg: 'Product Deleted' };
  }
}
export default ProductInteractor;
