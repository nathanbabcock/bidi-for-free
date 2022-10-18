/**
 * Lens Laws
 * @source https://arxiv.org/pdf/1910.10421.pdf
 */

import { GetFn, PutFn } from './types'

/** `∀s ∈ S, put(s, get(s)) = s` */
export const GetPut = (get: GetFn, put: PutFn, s: any): boolean =>
  put(s, get(s)) === s

/** `∀s ∈ S, ∀v ∈ V, get(put(s,v)) = v` */
export const PutGet = (get: GetFn, put: PutFn, s: any, v: any): boolean =>
  get(put(s, v)) === v

/** `∀s, s′ ∈ S, put(s, get(s′)) = s′` */
export const StrongGetPut = (get: GetFn, put: PutFn, s: any, sʼ: any): boolean =>
  put(s, get(sʼ)) === sʼ

/** `∀s ∈ S, ∀v,v′∈ V, put(put(s,v),v′) = put(s,v′)` */
export const PutPut = (put: PutFn, s: any, v: any, vʼ: any): boolean =>
  put(put(s, v), vʼ) === put(s, vʼ)
