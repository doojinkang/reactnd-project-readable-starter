import { CATEGORY_ADD } from './types.js'

export function addCategory (catArray) {
  return {
    type: CATEGORY_ADD,
    catArray,
  }
}

