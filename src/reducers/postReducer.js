import {
    POST_ADD,
    POST_EDIT,
    POST_VOTE,
    POST_DELETE,
    POST_CONFIG
} from '../actions/types'

const initialPost = {
  config: {
    sortBy: 'timestamp',  // or 'voteScore'
    order: 'descending',  // or 'ascending'
  },
  contents : {}
}

export default function post( state = initialPost, action) {
  // console.log('reducer.post', action)
  switch (action.type) {
  case POST_ADD:
  case POST_EDIT:
  case POST_VOTE:
  case POST_DELETE:
    return {
      ...state,
      contents: {
        ...state.contents,
        [action.post.id]: action.post
      }
    }
  case POST_CONFIG:
    return {
      ...state,
      config: {
        sortBy: action.sortBy,
        order: action.order
      }
    }
  default:
    return state
  }
}
