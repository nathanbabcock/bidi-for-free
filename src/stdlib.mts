export const length = (as: []) => as.length

/** @source https://gist.github.com/dev-thalizao/affaac253be5b5305e0faec3b650ba27 */
// zip :: [a] -> [b] -> [(a, b)]
export function zip<a, b>(as: a[], bs: b[]): [a, b][] {
  const length = Math.min(as.length, bs.length)
  const zipped: Array<[a, b]> = []

  for (let index = 0; index < length; index++)
    zipped.push([as[index], bs[index]])

  return zipped
}

/**
 * Purely functional, but not the most robust implementation,
 * as the length of the output depends on the length of the first paramater only.
 * @source https://gist.github.com/renaudtertrais/25fc5a2e64fe5d0e86894094c6989e10
 */
export const zip_functional = <α,>(a: α[], ...as: α[][]) =>
  a.map((val, i) => as.reduce((a, as) => [...a, as[i]], [val]))

export type Maybe<α> = α | undefined

// fromJust :: Maybe a -> a
export const fromJust = <α,>(m: Maybe<α>): α => {
  if (m === undefined) throw new Error('fromJust(undefined)')
  return m
}

/** Swap a 2-arity function's parameters */
// flip :: (a -> b -> c) -> b -> a -> c
export const flip = <α extends ((a: any, b: any) => any)>(f: α) =>
  (b: Parameters<α>[1], a: Parameters<α>[0]) => f(a, b) as ReturnType<α>

// tail :: NonEmpty a -> [a]
export const tail = <α,>(as: α[]) => as.slice(1)
