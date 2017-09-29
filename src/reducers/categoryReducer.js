import { CATEGORY_ADD } from '../actions/types'

const initialCategory = {
  contents: []
}

export default function category( state = initialCategory, action) {
  // console.log('reducer.category', action)
  switch (action.type) {
  case CATEGORY_ADD:
    return {
      ...state,
      contents: action.catArray
    }
  default:
    return state
  }
}
