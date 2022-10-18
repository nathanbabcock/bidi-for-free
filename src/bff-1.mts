/** First implementation from Voigtländer 2009, section 2 */

import { IntMap } from './IntMap.mjs'
import { GetPut, PutGet, PutPut } from './laws.mjs'
import { fromJust, tail, zip } from './stdlib.mjs'
import { BFF, GetFn, PutFn } from './types.js'

// bff get =
const bff_array: BFF<any[], any[]> = get =>

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

// 4 "lens adapters" for conversion between get/put for string/array:

export const getString = (get: GetFn<any[], any[]>): GetFn<string, string> =>
  s => get(s.split('')).join('')

export const putString = (put: PutFn<any[], any[]>): PutFn<string, string> =>
  (s, v) => put(s.split(''), v.split('')).join('')

export const getArray = (get: GetFn<string, string>): GetFn<any[], any[]> =>
  s => get(s.join('')).split('')

export const putArray = (put: PutFn<string, string>): PutFn<any[], any[]> =>
  (s, v) => put(s.join(''), v.join('')).split('')

export const bff_string: BFF<string, string> = get => {
  const get_array: GetFn<any[], any[]> = getArray(get)
  const put_array = bff_array(get_array)
  const put_string: PutFn<string, string> = putString(put_array)
  return put_string
}


export function main() {
  // Our current version of bff works quite nicely already. For example,
  // > bff tail "abcd" "bCd"
  console.log(bff_array(tail)(['a', 'b', 'c', 'd'], ['b', 'C', 'd']))
  // "abCd"

  // String version
  const getStr: GetFn<string, string> = (s: string) => tail(s.split('')).join('')
  const putStr = bff_string(getStr)
  console.log(putStr('abcd', 'bCd'))

  // Verify
  console.group('Verify (array)')
  const get = tail
  const put = bff_array(get)
  console.log('GetPut?', GetPut(get, put, ['a', 'b', 'c', 'd']))
  console.log('PutGet?', PutGet(put, get, ['a', 'b', 'c', 'd'], ['b', 'C', 'd']))
  console.log('PutPut?', PutPut(put, ['a', 'b', 'c', 'd'], ['b', 'C', 'd'], ['b', 'c', 'd']))
  console.groupEnd()

  // Test string version
  console.group('Verify (string)')
  console.log('GetPut?', GetPut(getStr, putStr, 'abcd'))
  console.log('PutGet?', PutGet(putStr, getStr, 'abcd', 'bCd'))
  console.log('PutPut?', PutPut(putStr, 'abcd', 'bCd', 'bcd'))
  console.groupEnd()
}
