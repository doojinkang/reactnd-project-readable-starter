import { COMMENT_ADD, COMMENT_VOTE, COMMENT_DELETE } from '../actions/types'

export default function comment( state = {}, action) {
  console.log('reducer.comment', action)
  switch (action.type) {
  case COMMENT_ADD:
    return {
      ...state,
      [action.id]: action.comment
    }
  case COMMENT_VOTE:
    return {
      ...state,
      [action.id]: {...state[action.id], voteScore: action.newVoteScore }
    }
  case COMMENT_DELETE:
    let  {[action.id]: deleted, ...newState} = state;
    return newState;
  default:
    return state
  }
}
