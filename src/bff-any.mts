/** Dead-end; an attempt at a polymorphic BFF with automatic adapters */

import { BFF, GetFn } from './types'

const bff_any: BFF<any, any> = <S, V>(get: GetFn<S, V>) => (s, v) => {
  type V_2 = ReturnType<typeof get> // === V
  let conversion_function: (getter: GetFn<S, V>) => GetFn<any[], any[]>
  // How to find this? We can't infer the ReturnType at runtime!
}
