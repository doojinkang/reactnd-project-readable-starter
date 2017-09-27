import { combineReducers } from 'redux'
import { POST_ADD, POST_VOTE, POST_DELETE, COMMENT_ADD, COMMENT_VOTE, COMMENT_DELETE } from '../actions/types'

function post( state = {}, action) {
  // console.log('reducer.post', action)
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

function comment( state = {}, action) {
  // console.log('reducer.comment', action)
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

export default combineReducers({ post, comment })
