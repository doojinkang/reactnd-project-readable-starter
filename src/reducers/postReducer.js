import { POST_ADD, POST_VOTE, POST_DELETE} from '../actions/types'

export default function post( state = {}, action) {
  console.log('reducer.post', action)
  switch (action.type) {
  case POST_ADD:
    return {
      ...state,
      [action.id]: action.post
    }
  case POST_VOTE:
    return {
      ...state,
      [action.id]: {...state[action.id], voteScore: action.newVoteScore }
    }
  case POST_DELETE:
    let  {[action.id]: deleted, ...newState} = state;
    return newState;
  default:
    return state
  }
}
