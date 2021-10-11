import User from '../entities/user/User';
import UserSearch from '../entities/user/UserSearch';

interface UserRepository {
  getById(id: number): Promise<User>;
  create(user: User): Promise<User>;
  update(id: number, user: User): Promise<User>;
  search(query: UserSearch): Promise<User[]>;
  delete(id: number): Promise<number>;
  getByUsername(username: string): Promise<User>;
}
export default UserRepository;
