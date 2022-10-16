import { Maybe } from './stdlib.mjs'

export type IntMap<α> = { [key: number]: α }

export namespace IntMap {
  // fromAscList :: [(Int, α)] → IntMap α
  export const fromAscList = <α,>(ascList: [number, α][]) =>
    ascList.reduce((prev, cur) => ({ ...prev, [cur[0]]: cur[1] }), {} as IntMap<α>)

  // union :: IntMap α → IntMap α → IntMap α
  export const union = <α,>(h: IntMap<α>, g: IntMap<α>): IntMap<α> =>
    ({ ...g, ...h })  // give "left-bias" to `h` (by allowing it overwrite `g`)

  // lookup :: Key -> IntMap a -> Maybe a
  export const lookup = <α,>(key: number, map: IntMap<α>): Maybe<α> => map[key]
}

// empty :: IntMap α
// notMember :: Int → IntMap α → Bool
// insert :: Int → α → IntMap α → IntMap α
// union :: IntMap α → IntMap α → IntMap α
// lookup :: Int → IntMap α → Maybe α
