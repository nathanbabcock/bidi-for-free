/** 4 "lens adapters" for conversion between get/put for string/array */

import { bff_array } from './bff-1.mjs'
import { BFF, GetFn, PutFn } from './types'

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
