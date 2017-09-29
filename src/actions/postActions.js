import { POST_ADD, POST_VOTE, POST_DELETE, POST_CONFIG
       } from './types.js'

export function postAdd (post) {
  return {
    type: POST_ADD,
    post
  }
}

export function postVote ({ id, newVoteScore }) {
  return {
    type: POST_VOTE,
    id,
    newVoteScore
  }
}

export function postDelete ({id}) {
  return {
    type: POST_DELETE,
    id,
  }
}

export function postConfig ({sortBy, order}) {
  return {
    type: POST_CONFIG,
    sortBy,
    order,
  }
}
