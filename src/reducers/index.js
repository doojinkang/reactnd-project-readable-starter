import { combineReducers } from 'redux'
import { POST_ADD, POST_VOTE, COMMENT_ADD, COMMENT_VOTE } from '../actions'

function post( state = {}, action) {
  console.log('reducer.post', action.type)
  switch (action.type) {
  case POST_ADD:
    const { id, timestamp, title, body, author, category, voteScore } = action
    return {
      ...state,
      [id]: {id, timestamp, title, body, author, category, voteScore}
    }
  case POST_VOTE:
    return {
      ...state,
      [action.id]: {...state[action.id], voteScore: action.newVoteScore }
    }
  default:
    return state
  }
}

function comment( state = {}, action) {
  console.log('reducer.comment', action.type)
  switch (action.type) {
  case COMMENT_ADD:
    const { id, timestamp, body, author, parentId, voteScore } = action
    return {
      ...state,
      [id]: {id, timestamp, body, author, parentId, voteScore}
    }
  case COMMENT_VOTE:
    return {
      ...state,
      [action.id]: {...state[action.id], voteScore: action.newVoteScore }
    }
  default:
    return state
  }
}

export default combineReducers({ post, comment })
