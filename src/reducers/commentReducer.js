import {
    COMMENT_ADD,
    COMMENT_EDIT,
    COMMENT_VOTE,
    COMMENT_DELETE,
    COMMENT_CONFIG
} from '../actions/types'

const initialComment = {
  config: {
    sortBy: 'timestamp',  // or 'voteScore'
    order: 'descending',  // or 'ascending'
  },
  contents : {}
}

export default function comment( state = initialComment, action) {
  // console.log('reducer.comment', action)
  switch (action.type) {
  case COMMENT_ADD:
  case COMMENT_EDIT:
  case COMMENT_VOTE:
  case COMMENT_DELETE:
    return {
      ...state,
      contents: {
        ...state.contents,
        [action.comment.id]: action.comment
      }
    }
  case COMMENT_CONFIG:
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
