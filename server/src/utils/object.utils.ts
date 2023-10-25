/**
 * Include only selected keys from the object.
 * @param obj
 * @param keys
 * @returns object
 */ export const pick = (obj: object, keys: string[]) => {
  return keys.reduce<{ [key: string]: unknown }>((acc, key) => {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      acc[key] = obj[key as keyof typeof obj];
    }
    return acc;
  }, {});
};

/**
 * Exclude selected keys from object.
 * @param obj
 * @param keys
 * @returns object
 */
export const exclude = <Type, Key extends keyof Type>(
  obj: Type,
  keys: Key[]
): Omit<Type, Key> => {
  for (const key of keys) {
    delete obj[key];
  }
  return obj;
};
