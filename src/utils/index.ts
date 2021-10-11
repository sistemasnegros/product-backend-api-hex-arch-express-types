const isEmpty = (obj: any) => {
  // Undefined
  if (typeof obj === 'undefined') return true;
  // Null
  if (typeof obj === null) return true;
  // String
  if (typeof obj === 'string') return obj === '';
  // Array
  if (Array.isArray(obj)) return obj.length === 0;
  // Object
  if (typeof obj === 'object') return Object.keys(obj).length === 0;

  return false;
};

export { isEmpty };
