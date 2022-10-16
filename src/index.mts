import { IntMap } from './IntMap.mjs'
import { flip, fromJust, tail, zip } from './stdlib.mjs'

/**
 * Derives a "view" from a parent array
 * Examples: reverse, slice, tail, head
 */
type GetFn = <α>(original: α[]) => α[] // (∀α.[α] → [α])

/**
 * Given a getter and a new value for the derived view,
 * apply the changes to the original array
 */
type PutFn = <α>(original: α[], newDerivedValue: α[]) => α[] // (∀α.[α] → [α] → [α])

/** Infer a `PutFn` from a `GetFn` at runtime *✨for free✨* */
type BFF = (get: GetFn) => PutFn // bff :: (∀α.[α] → [α]) → (∀α.[α] → [α] → [α])

/** First implementation from Voigtländer 2009, section 2 */
// bff get =
const bff: BFF = get =>

  // λs v →
  (s, v) => {

    // let s' = [0..length s − 1]
    const sʼ = s.map((_, i) => i)

    // g = IntMap.fromAscList (zip s' s)
    const g = IntMap.fromAscList(zip(sʼ, s))

    // h = assoc (get s') v
    const h = assoc(get(sʼ), v)

    // h' = IntMap.union h g
    const hʼ = IntMap.union(h, g)

    // in map (fromJust ◦ flip IntMap.lookup h') s'
    return sʼ.map(sʼi => fromJust(IntMap.lookup(sʼi, hʼ)))
    // const alt = sʼ.map(sʼi => flip(IntMap.lookup)(hʼ, sʼi))
  }

// assoc :: [Int] → [α] → IntMap α
const assoc = <α,>(is: number[], bs: α[]): IntMap<α> =>
  is.reduce((prev, cur, idx) => ({ ...prev, [cur]: bs[idx] }), {})

// const assoc_imperative = <α,>(is: number[], bs: α[]) => {
//   const map: IntMap<α> = {}
//   for (const i of is) map[i] = bs[i]
//   return map
// }

function test() {
  // Our current version of bff works quite nicely already. For example,

  // > bff tail "abcd" "bCd"
  console.log(bff(tail)(['a', 'b', 'c', 'd'], ['b', 'C', 'd']))
  // "abCd"
}
test()
