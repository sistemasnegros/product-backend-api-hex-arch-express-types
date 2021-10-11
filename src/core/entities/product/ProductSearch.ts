import Search from '../generic/Search';

export default interface ProductSearch extends Search {
  id?: number | undefined;
  name?: string | undefined;
  detail?: string | undefined;
}
