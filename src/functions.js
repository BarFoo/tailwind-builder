export const groupByKey = (list, key) =>
  list.reduce(
    (hash, obj, i) => ({
      ...hash,
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    }),
    {}
  );
