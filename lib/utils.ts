// Merges two arrays of objects based on their '_id' property.
// For each object in arr1, if an object with the same '_id' exists in arr2,
// its properties (except '_id') are merged into the object from arr1.
export function mergeById<T extends { _id: string }, U extends { _id: string }>(
  arr1: readonly T[],
  arr2: readonly U[]
): (T & Omit<Partial<U>, '_id'>)[] {
  const map = new Map<string, U>(arr2.map(item => [item._id, item]));

  return arr1.map((item): T & Omit<Partial<U>, '_id'> => {
    const found = map.get(item._id);
    if (!found) {
      return { ...item } as T & Omit<Partial<U>, '_id'>;
    }

    const { _id: _omit, ...rest } = found;
    return { ...item, ...rest } as T & Omit<Partial<U>, '_id'>;
  });
}

// Returns the current date in 'YYYY.MM.DD' format based on user's locale and timezone
export function getCurrentDate() {
  const locale =
    typeof navigator !== 'undefined' ? navigator.language : 'en-US';
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const dateString = new Date()
    .toLocaleDateString(locale, { timeZone })
    .replace(/\//g, '.')
    .replace(/^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})$/, '$3.$2.$1');

  return dateString;
}

// Capitalizes the first letter of a string and makes the rest lowercase
export const capitalize = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};
