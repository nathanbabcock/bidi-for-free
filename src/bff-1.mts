/** First implementation from Voigtländer 2009, section 2 */

import { IntMap } from './IntMap.mjs'
import { fromJust, tail, zip } from './stdlib.mjs'
import { BFF } from './types.js'

// bff get =
export const bff: BFF = get =>

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

export function main() {
  // Our current version of bff works quite nicely already. For example,
  // > bff tail "abcd" "bCd"
  console.log(bff(tail)(['a', 'b', 'c', 'd'], ['b', 'C', 'd']))
  // "abCd"
}
