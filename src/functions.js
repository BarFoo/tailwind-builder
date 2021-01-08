export function deepClone(src) {
  return JSON.parse(JSON.stringify(src));
}

export const groupByKey = (list, key) => list.reduce((hash, obj, i) => ({...hash, [obj[key]]:( hash[obj[key]] || [] ).concat({...obj, index: i})}), {});