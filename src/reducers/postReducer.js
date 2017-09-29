import { POST_ADD, POST_VOTE, POST_DELETE, POST_CONFIG} from '../actions/types'

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
