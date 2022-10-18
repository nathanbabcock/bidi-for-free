/**
 * Derives a "view" from a parent array
 * Examples: reverse, slice, tail, head
 */
export type GetFn<S, V> = (source: S) => V

/**
* Given the original and the new value of the derived view,
* apply the changes to the original array
*/
export type PutFn<S, V> = (source: S, updatedView: V) => S

/** Infer a `PutFn` from a `GetFn` at runtime *✨for free✨* */
export type BFF<S, V> = (get: GetFn<S, V>) => PutFn<S, V>
