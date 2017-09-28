import { CATEGORY_ADD } from '../actions/types'

export default function category( state = {}, action) {
  console.log('reducer.category', action)
  switch (action.type) {
  case CATEGORY_ADD:
    return {
      ...state,
      categories: action.catArray
    }
  default:
    return state
  }
}
