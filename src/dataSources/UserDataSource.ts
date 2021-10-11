import userRepository from '../core/repositories/userRepository';
import User from '../core/entities/user/User';
import UserModel from './sequelize/models/UserModel';
import UserSearch from '../core/entities/user/UserSearch';
import { FindOptions, WhereAttributeHash } from 'sequelize/types';
import { genDefaultOptions } from './sequelize/utils/utils';

class UserDataSource implements userRepository {
  public async getById(id: number): Promise<User> {
    const userModel: User = await UserModel.findOne({ where: { id } });
    return userModel;
  }

  public async create(user: User): Promise<User> {
    const userModel: User = await UserModel.create(user);

    return userModel;
  }

  public async update(id: number, user: User): Promise<User> {
    await UserModel.update(user, {
      where: { id },
    });
    const userModel = await UserModel.findByPk(id);
    return userModel;
  }

  public async delete(id: number): Promise<number> {
    const userModel: number = await UserModel.destroy({
      where: { id },
    });
    return userModel;
  }

  public async search(query: UserSearch): Promise<User[]> {
    const { id, username, sort, limit, offset, page } = query;
    const where: WhereAttributeHash = {};

    if (id) {
      where.id = id;
    }
    if (username) {
      where.username = username;
    }

    const options: FindOptions = await genDefaultOptions(
      { sort, limit, offset, page },
      UserModel,
      where,
    );

    // console.log('options', options);
    // console.log('where', where);

    const userModel: User[] = await UserModel.findAll(options);
    return userModel;
  }

  public async getByUsername(username: string): Promise<User> {
    const userModel: User = await UserModel.findOne({
      where: { username },
    });
    return userModel;
  }
}

export default UserDataSource;
