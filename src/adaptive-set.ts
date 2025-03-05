/**
 * AdaptiveSet is a set that can be a `Set`, `Single`, or `undefined`.
 */
export type AdaptiveSet<T> = null | Set<T> | T[] | undefined;

/**
 * Get the size of an AdaptiveSet.
 * @param col An AdaptiveSet.
 * @returns The size of the AdaptiveSet.
 */
export const size = <T>(col: AdaptiveSet<T>): number => (col ? (Array.isArray(col) ? col.length : col.size) : 0);

/**
 * Check if an item exists in an AdaptiveSet.
 * @param col An AdaptiveSet.
 * @param value Value to check.
 * @returns `true` if the value exists, otherwise `false`.
 */
export const has = <T>(col: AdaptiveSet<T>, value: T): boolean =>
  !!col && (Array.isArray(col) ? col.length > 0 && Object.is(col[0], value) : col.has(value));

/**
 * Add an item to an AdaptiveSet.
 * @param col An AdaptiveSet.
 * @param value Value to add.
 * @returns The updated AdaptiveSet.
 */
export const add = <T>(col: AdaptiveSet<T>, value: T): Set<T> | T[] =>
  col ? (Array.isArray(col) ? (col.push(value) > 1 ? new Set(col) : col) : col.add(value)) : [value];

/**
 * Remove an item from an AdaptiveSet.
 * @param col An AdaptiveSet.
 * @param value Value to remove.
 * @returns The updated AdaptiveSet.
 */
export const remove = <T>(col: AdaptiveSet<T>, value: T): AdaptiveSet<T> =>
  col && (Array.isArray(col) ? col.length > 0 && Object.is(col[0], value) && (col.length = 0) : col.delete(value), col);

/**
 * Clear an AdaptiveSet. Returns the cleared `Set` if `col` is a `Set`.
 *
 * Tip: If you don't want to reuse a cleared `Set`, just `s = null`.
 * @param col An AdaptiveSet.
 * @returns The updated AdaptiveSet.
 */
export const clear = <T>(col: AdaptiveSet<T>): AdaptiveSet<T> =>
  col && (Array.isArray(col) ? (col.length = 0) : col.clear(), col);
