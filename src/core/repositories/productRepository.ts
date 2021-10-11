import Product from '../entities/product/Product';
import ProductSearch from '../entities/product/ProductSearch';

interface ProductRepository {
  getById(id: number): Promise<Product>;
  create(product: Product): Promise<Product>;
  update(id: number, product: Product): Promise<Product>;
  search(query: ProductSearch): Promise<Product[]>;
  delete(id: number): Promise<number>;
}
export default ProductRepository;
