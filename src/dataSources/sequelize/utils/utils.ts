import {
  FindOptions,
  IncludeOptions,
  OrderItem,
  WhereAttributeHash,
} from 'sequelize/types';
import Search from '../../../core/entities/generic/Search';

const nomalizeQuerySort = (sort: string): OrderItem[] =>
  sort
    .split(',')
    .map((n) =>
      n.startsWith('-')
        ? [n.replace('-', ''), 'DESC']
        : [n.replace('+', ''), 'ASC'],
    );

interface typeOffsetpagination {
  offset: number;
  pages: number;
  count: number;
}

const getOffsetpagination = async (
  model: any,
  where: WhereAttributeHash,
  limit: number,
  page: number,
  include?: IncludeOptions,
): Promise<typeOffsetpagination> => {
  const options: FindOptions = { where, limit: 0 };
  if (include) {
    options.include;
  }
  const { count } = await model.findAndCountAll(options);
  const pages = Math.ceil(count / limit);
  const offset = limit * (page - 1);
  return { offset, pages, count };
};

const genDefaultOptions = async (
  { sort, limit, offset, page }: Search,
  model: any,
  where: WhereAttributeHash,
  include?: IncludeOptions,
): Promise<FindOptions> => {
  const options: FindOptions = {};
  if (sort) {
    options.order = nomalizeQuerySort(sort);
  }

  if (limit) {
    options.limit = limit;
  }

  if (offset) {
    options.offset = offset;
  }

  if (page && limit) {
    const pagination = await getOffsetpagination(
      model,
      where,
      limit,
      page,
      include,
    );
    options.offset = pagination.offset;
  }

  options.where = where;

  return options;
};

export { nomalizeQuerySort, getOffsetpagination, genDefaultOptions };
