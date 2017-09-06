import { combineReducers } from 'redux'
import { POST_ADD, COMMENT_ADD } from '../actions'

function post( state = {}, action) {
  const { id, timestamp, title, body, author, category, voteScore } = action

  console.log('reducer.post', action.type, id, timestamp, title, body, author, category, voteScore)
  switch (action.type) {
  case POST_ADD:
    return {
      ...state,
      [id]: {id, timestamp, title, body, author, category, voteScore}
    }
  default:
    return state
  }
}

function comment( state = {}, action) {
  const { id, timestamp, body, author, parentId, voteScore } = action
  
    console.log('reducer.comment', action.type, id, timestamp, body, author, parentId, voteScore)
    switch (action.type) {
    case COMMENT_ADD:
      return {
        ...state,
        [id]: {id, timestamp, body, author, parentId, voteScore}
      }
    default:
      return state
    }    
}

export default combineReducers({ post, comment })
