import { Model, DataTypes, Optional } from 'sequelize';

import ProductAttributes from '../../../core/entities/product/Product';
import sequelizeInstance from '../index';

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public detail!: string;
  public price!: number;
  public image!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    detail: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      defaultValue: '',
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    tableName: 'Product',
    sequelize: sequelizeInstance,
  },
);

export default Product;
