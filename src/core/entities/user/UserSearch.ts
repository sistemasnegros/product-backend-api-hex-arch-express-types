import Search from '../generic/Search';

export default interface UserSearch extends Search {
  id?: number | undefined;
  username?: string | undefined;
}
