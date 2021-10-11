import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import UserRepository from '../repositories/userRepository';
import UserEntity from '../entities/user/User';
import UserSearch from '../entities/generic/Search';
import ERRORS from '../../const/errors';

dotenv.config();
const { SECRET_KEY } = process.env;

class UserInteractor {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getById(id: number): Promise<UserEntity> {
    const userModel: UserEntity = await this.userRepository.getById(id);
    if (!userModel) {
      throw new Error(ERRORS.ID_NOT_FOUND);
    }
    const user: any = {
      id: userModel.id,
      username: userModel.username,
      firstname: userModel.firstname,
      lastname: userModel.lastname,
    };

    return user;
  }

  async search(query: UserSearch): Promise<UserEntity[]> {
    const userModel: UserEntity[] = await this.userRepository.search(query);
    if (!userModel) {
      throw new Error(ERRORS.INTERNAL_ERROR);
    }
    return userModel;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    user.password = bcrypt.hashSync(user.password, 10);

    const userModel: UserEntity = await this.userRepository.create(user);
    if (!userModel) {
      throw new Error(ERRORS.INTERNAL_ERROR);
    }
    return userModel;
  }

  async update(id: number, user: UserEntity): Promise<UserEntity> {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, 10);
    }

    const userModel: UserEntity = await this.userRepository.update(id, user);
    if (!userModel) {
      throw new Error(ERRORS.INTERNAL_ERROR);
    }
    return userModel;
  }

  async delete(id: number): Promise<any> {
    const userModel: number = await this.userRepository.delete(id);

    if (!userModel) {
      throw new Error(ERRORS.INTERNAL_ERROR);
    }
    return { status: 'ok', msg: 'User Deleted' };
  }

  async login(username: string, password: string): Promise<string> {
    const userModel: UserEntity = await this.userRepository.getByUsername(
      username,
    );

    if (!userModel) {
      throw new Error(ERRORS.INTERNAL_ERROR);
    }

    const isValidPassword =
      userModel && bcrypt.compareSync(password, userModel.password);

    if (isValidPassword) {
      const token = jwt.sign(
        {
          id: userModel.id,
          username: userModel.username,
        },
        SECRET_KEY,
      );

      return token;
    } else {
      throw new Error(ERRORS.AUHT_FAILED);
    }
  }
}
export default UserInteractor;
