import { CATEGORY_ADD } from './types.js'

export function categoryAdd (catArray) {
  return {
    type: CATEGORY_ADD,
    catArray,
  }
}

