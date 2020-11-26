const omitUndefined = <T>(obj: T): T => {
  const newObj = {} as T;
  Object.keys(obj || {}).forEach((key) => {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

export default omitUndefined;
