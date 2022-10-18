import { bff } from './bff-1.mjs'
import { tail } from './stdlib.mjs'

// Our current version of bff works quite nicely already. For example,
// > bff tail "abcd" "bCd"
console.log(bff(tail)(['a', 'b', 'c', 'd'], ['b', 'C', 'd']))
// "abCd"
