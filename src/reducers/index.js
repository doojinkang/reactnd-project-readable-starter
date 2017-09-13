import { combineReducers } from 'redux'
import { POST_ADD, POST_VOTE, POST_DELETE, COMMENT_ADD, COMMENT_VOTE, COMMENT_DELETE } from '../actions'

function post( state = {}, action) {
  console.log('reducer.post', action.type)
  switch (action.type) {
  case POST_ADD:
    const { id, timestamp, title, body, author, category, voteScore, deleted } = action
    return {
      ...state,
      [id]: {id, timestamp, title, body, author, category, voteScore, deleted}
    }
  case POST_VOTE:
    return {
      ...state,
      [action.id]: {...state[action.id], voteScore: action.newVoteScore }
    }
  case POST_DELETE:
    return {
      ...state,
      [action.id]: {...state[action.id], deleted: true }
    }
  default:
    return state
  }
}

function comment( state = {}, action) {
  console.log('reducer.comment', action.type)
  switch (action.type) {
  case COMMENT_ADD:
    const { id, timestamp, body, author, parentId, voteScore, deleted, parentDeleted } = action
    return {
      ...state,
      [id]: {id, timestamp, body, author, parentId, voteScore, deleted, parentDeleted}
    }
  case COMMENT_VOTE:
    return {
      ...state,
      [action.id]: {...state[action.id], voteScore: action.newVoteScore }
    }
  case COMMENT_DELETE:
    return {
      ...state,
      [action.id]: {...state[action.id], deleted: true }
    }
  default:
    return state
  }
}

export default combineReducers({ post, comment })
