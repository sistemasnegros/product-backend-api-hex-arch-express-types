const buildSearch = (sort: any, limit: any, offset: any, page: any) => ({
  sort: typeof sort === 'string' ? String(sort) : undefined,
  limit: typeof limit === 'string' ? parseInt(limit) : undefined,
  offset: typeof offset === 'string' ? parseInt(offset) : undefined,
  page: typeof page === 'string' ? parseInt(page) : undefined,
});

export { buildSearch };
