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
