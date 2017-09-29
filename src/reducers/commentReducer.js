import { COMMENT_ADD, COMMENT_VOTE, COMMENT_DELETE, COMMENT_CONFIG } from '../actions/types'

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
    return {
      ...state,
      contents: {
        ...state.contents,
        [action.id]: action.comment
      }
    }
  case COMMENT_VOTE:
    return {
      ...state,
      contents: {
        ...state.contents,
        [action.id]: {...state.contents[action.id], voteScore: action.newVoteScore }
      }
    }
  case COMMENT_DELETE:
    let  {[action.id]: deleted, ...newState} = state.contents;
    return {
      ...state,
      contents: newState
    };
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
