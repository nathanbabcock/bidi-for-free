/**
 * Derives a "view" from a parent array
 * Examples: reverse, slice, tail, head
 */
export type GetFn = <α>(original: α[]) => α[] // (∀α.[α] → [α])

/**
* Given the original and the new value of the derived view,
* apply the changes to the original array
*/
export type PutFn = <α>(original: α[], newDerivedValue: α[]) => α[] // (∀α.[α] → [α] → [α])

/** Infer a `PutFn` from a `GetFn` at runtime *✨for free✨* */
export type BFF = (get: GetFn) => PutFn // bff :: (∀α.[α] → [α]) → (∀α.[α] → [α] → [α])
