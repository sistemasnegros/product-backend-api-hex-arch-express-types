async function paginator(
  Model: any,
  limit = 1,
  page = 1,
  sort: any = [],
  include: any = null,
  where = {},
): Promise<any> {
  let offset = 0;
  const optionsCount: any = {};

  optionsCount.where = where;
  optionsCount.limit = 0;

  if (include) {
    optionsCount.include = include;
  }

  const data = await Model.findAndCountAll(optionsCount);

  // console.log(where);
  // console.log(include);
  //console.log(optionsCount);
  //console.log(data.count);

  const pages = Math.ceil(data.count / limit);
  offset = limit * (page - 1);

  let options = {
    limit: limit,
    offset: offset,
    order: sort,
  };

  if (include) {
    options = Object.assign({}, options, { include: include });
  }

  if (where) {
    options = Object.assign({}, options, { where: where });
  }

  const elements = await Model.findAll(options);

  return { elements, count: data.count, pages: pages, currentPage: page };
}

export default paginator;
