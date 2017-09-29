import { POST_ADD, POST_VOTE, POST_DELETE} from '../actions/types'

const initialPost = {
  contents : {}
}

export default function post( state = initialPost, action) {
  // console.log('reducer.post', action)
  switch (action.type) {
  case POST_ADD:
    return {
      ...state,
      contents: {
        ...state.contents,
        [action.id]: action.post
      }
    }
  case POST_VOTE:
    return {
      ...state,
      contents: {
        ...state.contents,
        [action.id]: {...state.contents[action.id], voteScore: action.newVoteScore }
      }
    }
  case POST_DELETE:
    let  {[action.id]: deleted, ...newState} = state.contents;
    return {
      ...state,
      contents: newState
    };
  default:
    return state
  }
}
