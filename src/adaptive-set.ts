/**
 * `Single` is a set that contains only one item.
 */
export type Single<T> = [T];

/**
 * AdaptiveSet is a set that can be a `Set`, `Single`, or `undefined`.
 */
export type AdaptiveSet<T> = Set<T> | Single<T> | undefined;

/**
 * Check if an AdaptiveSet is a `Single`.
 * @param col An AdaptiveSet.
 * @returns `true` if the AdaptiveSet is a `Single`, otherwise `false`.
 */
export const isSingle: <T>(col: AdaptiveSet<T>) => col is Single<T> =
  Array.isArray as never;

/**
 * Get the size of an AdaptiveSet.
 * @param col An AdaptiveSet.
 * @returns The size of the AdaptiveSet.
 */
export const size = <T>(col: AdaptiveSet<T>): number =>
  !col ? 0 : isSingle(col) ? 1 : col.size;

/**
 * Check if an item exists in an AdaptiveSet.
 * @param col An AdaptiveSet.
 * @param value Value to check.
 * @returns `true` if the value exists, otherwise `false`.
 */
export const has = <T>(col: AdaptiveSet<T>, value: T): boolean =>
  !!col && (isSingle(col) ? col[0] === value : col.has(value));

/**
 * Add an item to an AdaptiveSet.
 * @param col An AdaptiveSet.
 * @param value Value to add.
 * @returns The updated AdaptiveSet.
 */
export const add = <T>(col: AdaptiveSet<T>, value: T): Single<T> | Set<T> =>
  !col ? [value] : isSingle(col) ? new Set([col[0], value]) : col.add(value);

/**
 * Remove an item from an AdaptiveSet.
 * @param col An AdaptiveSet.
 * @param value Value to remove.
 * @param drop If true, returns `undefined` when empty, otherwise returns `col`. Default is `false`.
 * @returns The updated AdaptiveSet.
 */
export const remove = <T>(
  col: AdaptiveSet<T>,
  value: T,
  drop?: boolean
): AdaptiveSet<T> =>
  col &&
  ((
    isSingle(col)
      ? !Object.is(col[0], value)
      : (col.delete(value), !drop || col.size)
  )
    ? col
    : undefined);
